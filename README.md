# Repositorio de NestJS

## ¿Qué es NestJS?

NestJS es un marco de trabajo diseñado para crear aplicaciones de servidor con Node.js. Es como una caja de herramientas que ayuda a los programadores a construir aplicaciones más fácilmente, especialmente aquellas que son grandes y complejas, como sitios web que necesitan manejar muchas solicitudes al mismo tiempo o servicios que comunican diferentes partes de una aplicación.

Este framework utiliza TypeScript, una versión de JavaScript que añade reglas más estrictas para escribir el código, lo que ayuda a prevenir errores y hace que el código sea más claro y fácil de entender. Imagina TypeScript como un asistente que te guía mientras programas, asegurándote de que todo encaje correctamente.

NestJS está pensado para ser muy organizado, permitiendo a los desarrolladores dividir su código en pequeñas piezas que pueden trabajar juntas de manera eficiente. Esto es especialmente útil para proyectos grandes, donde mantener el código ordenado puede ser un desafío.

Una de las grandes ventajas de NestJS es que trabaja bien con otros frameworks de Node.js, como Express.js, que se utiliza para manejar las solicitudes y respuestas en tu servidor, o Fastify, conocido por su rapidez. Esto significa que puedes aprovechar lo mejor de estos mundos para hacer que tu aplicación sea rápida y confiable.

Claro, vamos a expandir la sección sobre Arquitectura Modular con una explicación detallada y un ejemplo.

---

## Arquitectura Modular

La arquitectura modular es uno de los principios fundamentales de NestJS, que promueve la organización del código en módulos. Cada módulo encapsula una parte específica de la funcionalidad de la aplicación, lo que facilita la separación de responsabilidades, la reutilización de código y la mantenibilidad. Los módulos pueden importar otros módulos, lo que permite crear una estructura de aplicación altamente cohesiva y bien organizada.

**Ejemplo**:

Supongamos que estamos construyendo una aplicación con funcionalidades relacionadas con usuarios y productos. Podríamos organizar nuestra aplicación en dos módulos principales: `UsersModule` y `ProductsModule`.

```typescript
// users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

```typescript
// products.module.ts
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
```

**Explicación**:

En el ejemplo anterior, definimos dos módulos: `UsersModule` y `ProductsModule`. Cada módulo se decora con `@Module`, donde especificamos los controladores y los proveedores (servicios) que pertenecen a cada módulo. Esta estructura modular nos permite encapsular toda la lógica relacionada con usuarios y productos dentro de sus respectivos módulos, haciendo que nuestro código sea más limpio, más fácil de entender y de mantener.

La arquitectura modular no solo ayuda en la organización del código, sino que también facilita la escalabilidad de la aplicación. A medida que la aplicación crece, podemos seguir añadiendo más módulos o reorganizando los existentes sin afectar otras partes de la aplicación. Esto es especialmente útil en proyectos grandes y complejos, donde mantener una estructura clara y coherente es fundamental para el éxito del desarrollo.

Además, NestJS maneja automáticamente las dependencias entre módulos, lo que significa que si un módulo depende de servicios definidos en otro módulo, NestJS se asegurará de resolver esas dependencias correctamente. Esto simplifica aún más el desarrollo y mejora la experiencia general al construir aplicaciones con NestJS.

## Inyección de Dependencias

La Inyección de Dependencias (DI) es un patrón de diseño fundamental en NestJS, utilizado para gestionar la creación de objetos y sus dependencias de manera centralizada. Permite a los componentes de la aplicación (como controladores, servicios, etc.) ser menos acoplados, más modulares y más fáciles de testear. NestJS utiliza DI para instanciar clases automáticamente con todas las dependencias que necesitan, sin que el desarrollador tenga que crearlas manualmente.

**Ejemplo**:

Consideremos una aplicación que tiene un servicio `CatsService` que depende de otro componente, por ejemplo, un repositorio `CatsRepository` para realizar operaciones de base de datos.

```typescript
// cats.repository.ts
@Injectable()
export class CatsRepository {
  findCat(id: number): Cat {
    // Lógica para buscar un gato en la base de datos
  }
}

// cats.service.ts
@Injectable()
export class CatsService {
  constructor(private catsRepository: CatsRepository) {}

  findCat(id: number): Cat {
    return this.catsRepository.findCat(id);
  }
}
```

**Explicación**:

En el ejemplo anterior, `CatsService` necesita acceder a `CatsRepository` para buscar un gato por su ID. En lugar de crear una instancia de `CatsRepository` dentro de `CatsService` usando `new CatsRepository()`, lo que aumentaría el acoplamiento entre estas clases, utilizamos la inyección de dependencias. Al pasar `CatsRepository` como un argumento al constructor de `CatsService` y anotar `CatsService` con el decorador `@Injectable()`, NestJS se encarga de instanciar `CatsRepository` y pasarlo a `CatsService` cuando este último también se instancie.

Este enfoque tiene varias ventajas:

1. **Desacoplamiento**: `CatsService` no necesita saber cómo se crea `CatsRepository`, solo que está disponible para su uso. Esto facilita el cambio de la implementación de `CatsRepository` sin afectar a `CatsService`.

2. **Facilidad de prueba**: Al desacoplar las clases, se simplifica el mock (simulación) de `CatsRepository` cuando se prueban las funcionalidades de `CatsService`, lo que permite tests más aislados y controlados.

3. **Gestión centralizada**: NestJS maneja la creación y vinculación de las dependencias, lo que significa que los desarrolladores no tienen que gestionar el ciclo de vida de los objetos manualmente. Esto reduce el riesgo de errores, como instancias duplicadas o fugas de memoria.

La inyección de dependencias es un concepto clave para comprender y aprovechar al máximo el poder y la flexibilidad que ofrece NestJS, facilitando la creación de aplicaciones escalables y mantenibles.

## Decoradores

Los decoradores son una característica avanzada de TypeScript (y propuesta para JavaScript) que permite añadir anotaciones y una lógica adicional a las clases, propiedades, métodos y parámetros sin modificar el comportamiento original. En NestJS, los decoradores se utilizan extensivamente para definir y enriquecer los elementos de la aplicación, como módulos, controladores, rutas, servicios, y más, proporcionando una sintaxis declarativa y reduciendo el boilerplate.

**Ejemplo**:

Supongamos que queremos crear un controlador para una entidad `Cats` en nuestra aplicación. Usaremos varios decoradores proporcionados por NestJS para definir el controlador, sus rutas y cómo se inyectan las dependencias.

```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }
}
```

**Explicación**:

- **@Controller('cats')**: Este decorador marca la clase `CatsController` como un controlador cuya ruta base será `/cats`. Los controladores son responsables de manejar las solicitudes y respuestas HTTP.

- **@Get(':id')**: Define un manejador de método para solicitudes GET a la ruta `/cats/:id`, donde `:id` es un parámetro de ruta. Este decorador indica que el método `findOne` se debe llamar cuando se hace una solicitud GET a esta ruta específica.

- **@Post()**: Marca el método `create` como un manejador de solicitudes POST a la ruta base del controlador `/cats`. Se usa para crear una nueva instancia de `Cat`.

- **@Body()**: Usado para extraer el cuerpo de la solicitud y automáticamente mapearlo al objeto `CreateCatDto`. Este decorador facilita la validación y tipado de los datos de entrada para operaciones de creación o actualización.

- **@Param('id')**: Extrae el parámetro `id` de la ruta y lo pasa al método `findOne`. Esto permite acceder a parámetros específicos de la ruta de manera fácil y directa.

Los decoradores permiten a NestJS manejar gran parte de la complejidad subyacente, como el enrutamiento, la inyección de dependencias y la serialización de respuestas, de forma declarativa y concisa. Esto no solo mejora la legibilidad del código, sino que también facilita el mantenimiento y promueve las mejores prácticas de desarrollo de software.

## Controllers

Los controllers son los componentes de NestJS que manejan las solicitudes entrantes y devuelven las respuestas al cliente. Actúan como el puente entre el cliente y la aplicación, gestionando las interacciones HTTP. En NestJS, los controllers se definen con clases de TypeScript y se anotan con el decorador `@Controller`, el cual puede opcionalmente especificar un prefijo de ruta para todas las rutas definidas dentro del controlador.

**Ejemplo**:

Vamos a definir un controlador básico para gestionar usuarios, donde se pueden crear nuevos usuarios y buscar un usuario por su ID.

```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
```

**Explicación**:

- **@Controller('users')**: Este decorador define que la clase `UsersController` es un controlador con un prefijo de ruta `/users`. Esto significa que todas las rutas definidas en este controlador estarán precedidas por `/users`.

- **@Post()**: Aquí, el método `create` está marcado para manejar solicitudes POST en la ruta `/users`. Utiliza el decorador `@Body` para extraer y mapear el cuerpo de la solicitud a `CreateUserDto`, que es un DTO (Data Transfer Object) que define la estructura de los datos esperados en el cuerpo de la solicitud.

- **@Get(':id')**: Este decorador indica que el método `findOne` manejará las solicitudes GET a `/users/:id`, donde `:id` es un parámetro dinámico que representa el ID del usuario. El decorador `@Param('id')` extrae el valor del parámetro `id` de la URL y lo pasa al método.

Los controllers en NestJS desempeñan un papel crucial en la estructura de una aplicación, organizando la lógica de enrutamiento y asegurando que las solicitudes sean manejadas de manera eficiente. La separación clara entre la lógica de negocio, manejada por los servicios, y la lógica de enrutamiento y manejo de solicitudes, manejada por los controladores, es una de las mejores prácticas que NestJS fomenta para construir aplicaciones escalables y mantenibles.

## Providers

En NestJS, los providers son conceptos centrales que pueden tomar varias formas, como servicios, repositorios, fábricas, helpers, y más. Su propósito principal es encapsular y organizar la lógica de negocio, operaciones de base de datos o cualquier funcionalidad específica, permitiendo su reutilización a través de la aplicación. Los providers son inyectables, lo que significa que NestJS puede automáticamente instanciarlos y resolver sus dependencias sin necesidad de hacerlo manualmente, gracias a su sistema de Inyección de Dependencias.

**Ejemplo**:

Imagina que estamos construyendo una aplicación que necesita realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una entidad `Book`. Podríamos tener un servicio `BooksService` que actúa como un provider para encapsular toda la lógica relacionada con estas operaciones.

```typescript
import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [];

  create(book: Book) {
    this.books.push(book);
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    return this.books.find(book => book.id === id);
  }

  // Métodos para actualizar y eliminar libros...
}
```

**Explicación**:

- **@Injectable()**: Este decorador marca la clase `BooksService` como un provider, lo que significa que puede ser gestionado por el sistema de Inyección de Dependencias de NestJS. Esto permite que `BooksService` sea inyectado en controladores u otros servicios.

- **books**: Una propiedad privada que simula una base de datos de libros en memoria.

- **create**, **findAll**, **findOne**: Métodos para realizar operaciones CRUD en la colección de libros. Estos métodos encapsulan la lógica específica para manipular los datos de los libros, separando las preocupaciones y facilitando el mantenimiento y la prueba del código.

Los providers son fundamentales en la arquitectura de NestJS, promoviendo un diseño de software sólido y escalable. Al utilizar providers, se fomenta la separación de responsabilidades dentro de la aplicación, lo que resulta en un código más organizado, reutilizable y fácil de testear. Además, la capacidad de inyectar estos providers donde sea necesario, sin preocuparse por su instanciación, simplifica enormemente el manejo de dependencias y mejora la eficiencia del desarrollo.

## Middleware

En NestJS, un middleware es una función que se ejecuta antes de los controladores una vez que se ha establecido la solicitud. Puede realizar diversas tareas como manipulación de solicitudes, validaciones, logging, y más. Los middleware son similares a los middleware en Express.js pero están diseñados para trabajar dentro del ecosistema de NestJS, aprovechando su sistema de módulos y dependencias.

**Ejemplo**:

Supongamos que queremos registrar cada solicitud que llega a nuestra aplicación, incluyendo la ruta y el método HTTP utilizado. Podemos crear un middleware de logging para este propósito.

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  }
}
```

Para aplicar este middleware, necesitamos configurarlo en un módulo, usualmente en el módulo donde se desea que actúe el middleware.

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
```

**Explicación**:

- **LoggerMiddleware**: Define un middleware que registra información sobre cada solicitud. Implementa `NestMiddleware`, lo que requiere el método `use`. Este método toma la solicitud (`req`), la respuesta (`res`), y la función `next` como argumentos. `next` es una función que se debe llamar cuando el middleware ha completado su tarea para pasar el control al siguiente middleware en la pila o al controlador si no hay más middleware.

- **AppModule**: En el método `configure`, usamos `consumer.apply(LoggerMiddleware).forRoutes('*');` para aplicar el middleware a todas las rutas de la aplicación. Podrías especificar rutas más específicas si solo necesitas el middleware en ciertas partes de tu aplicación.

Los middleware en NestJS ofrecen una potente herramienta para la ejecución de código antes de que las solicitudes lleguen a los controladores, permitiendo una manipulación flexible de las solicitudes y respuestas, y facilitando tareas comunes como logging, autenticación y autorización, o cualquier otra lógica previa a la solicitud que necesite ser ejecutada de manera global o en rutas específicas.

## Guardias (Guards)

Los guardias en NestJS son responsables de determinar si una solicitud debe ser manejada por el controlador. Funcionan como una capa de autorización que se ejecuta antes del manejador de ruta (controlador) y después de los middleware. Son especialmente útiles para implementar lógica de autenticación y autorización, permitiendo o denegando el acceso a ciertas rutas basadas en los criterios definidos (como roles de usuario, tokens JWT, etc.).

**Ejemplo**:

Imagina que deseas restringir el acceso a ciertas rutas solo a usuarios autenticados. Podemos crear un guardia `AuthGuard` que verifica si el usuario está autenticado.

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Aquí implementarías tu lógica de autenticación
    // Por ejemplo, verificar si hay un token válido en los headers
    return !!request.headers.authorization;
  }
}
```

Para usar este guardia en un controlador, lo aplicarías de la siguiente manera:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('protected')
@UseGuards(AuthGuard)
export class ProtectedController {
  @Get()
  findSecretData() {
    return 'Datos secretos solo para usuarios autenticados';
  }
}
```

**Explicación**:

- **AuthGuard**: Define un guardia que implementa la interfaz `CanActivate`. El método `canActivate` determina si la solicitud actual puede continuar hacia el controlador. En este caso, verifica si la solicitud contiene un header de autorización. Si está presente, devuelve `true`, permitiendo que la solicitud continúe; de lo contrario, devuelve `false`, y NestJS denegará el acceso a la ruta.

- **@UseGuards(AuthGuard)**: Este decorador se utiliza para aplicar el guardia al controlador `ProtectedController` o a rutas específicas dentro del controlador. Aquí, lo aplicamos a nivel de controlador, lo que significa que todas las rutas definidas en `ProtectedController` requerirán pasar por el `AuthGuard` para ser accesibles.

Los guardias en NestJS proporcionan un mecanismo extensible y poderoso para la seguridad de tu aplicación, permitiéndote controlar el acceso a tus rutas de manera granular y centralizada. Al combinar guardias con el sistema de módulos y dependencias de NestJS, puedes construir aplicaciones seguras y bien estructuradas con relativa facilidad.

## Pipes

Los Pipes en NestJS son clases que implementan la interfaz `PipeTransform` y se utilizan principalmente para la transformación de datos de entrada y la validación. Operan en los argumentos de los métodos de los controladores antes de que se ejecute la lógica del controlador, permitiendo así modificar los datos entrantes o rechazar la solicitud completamente si los datos no pasan la validación.

**Ejemplo**:

Supongamos que queremos validar y transformar los datos de entrada de una solicitud para crear un nuevo usuario, asegurándonos de que el campo `edad` sea un número entero. Podemos crear un Pipe personalizado para esto.

```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('La edad debe ser un número entero');
    }
    return val;
  }
}
```

Para utilizar este Pipe, simplemente lo aplicamos en el método del controlador correspondiente:

```typescript
import { Controller, Post, Body, UsePipes } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  @UsePipes(new ParseIntPipe())
  createUser(@Body('edad') edad: number) {
    // Lógica para crear el usuario
    return `Usuario creado con edad ${edad}`;
  }
}
```

**Explicación**:

- **ParseIntPipe**: Este Pipe personalizado transforma la entrada de una cadena a un número, asegurándose de que el valor sea un entero válido. Si el valor no es un número, lanza una excepción `BadRequestException`, lo que automáticamente rechaza la solicitud con un status 400 y un mensaje de error.

- **@UsePipes(new ParseIntPipe())**: Este decorador aplica el `ParseIntPipe` al método `createUser`. NestJS ejecutará el Pipe antes de la lógica del controlador, pasando el resultado transformado (si es válido) a `edad`. Esto asegura que el controlador reciba siempre un valor de tipo correcto y válido, simplificando la lógica de validación y transformación dentro del controlador.

Los Pipes ofrecen una poderosa abstracción para el preprocesamiento de solicitudes, permitiendo una validación robusta y transformación de datos antes de que lleguen a los controladores. Esto hace que el código sea más limpio, más fácil de entender y mantener, al separar las preocupaciones de validación y transformación de la lógica de negocio principal de los controladores.

## Interceptores

Los Interceptores en NestJS son clases que implementan la interfaz `NestInterceptor` y ofrecen una manera de interceptar la ejecución de métodos de controladores. Permiten añadir lógica extra antes o después de la ejecución del método del controlador, o modificar el resultado que el método devuelve o el flujo de ejecución, como errores que pueda lanzar. Son especialmente útiles para tareas como logging, transformación de respuestas, manejo de errores, y ejecución de lógica adicional como la caché.

**Ejemplo**:

Supongamos que queremos escribir un interceptor que registre el tiempo que tarda en ejecutarse una solicitud, desde que llega hasta que se envía la respuesta.

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Antes de ejecutar el controlador');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Después de ejecutar el controlador: ${Date.now() - now}ms`))
      );
  }
}
```

Para aplicar este interceptor, se puede hacer a nivel de ruta usando el decorador `@UseInterceptors()` en un método de controlador, o a nivel de controlador o aplicación global.

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';

@Controller('test')
@UseInterceptors(LoggingInterceptor)
export class TestController {
  @Get()
  test() {
    return { message: 'Esta es una prueba' };
  }
}
```

**Explicación**:

- **LoggingInterceptor**: Define un interceptor que registra el inicio de la ejecución de un controlador y luego, usando RxJS `tap`, registra cuánto tiempo tardó la ejecución después de que el controlador ha terminado. `next.handle()` devuelve un `Observable` que representa la respuesta del controlador.

- **@UseInterceptors(LoggingInterceptor)**: Aplica el `LoggingInterceptor` al `TestController` o a métodos específicos dentro de este controlador. Cada vez que se llama al endpoint asociado, el interceptor envuelve la ejecución del método del controlador, permitiendo registrar el tiempo de ejecución como se definió en el interceptor.

Los interceptores son herramientas poderosas para añadir lógica de una manera limpia y reutilizable, sin tener que mezclarla con la lógica de negocio de los controladores. Permiten manejar aspectos transversales de la aplicación de manera eficiente, como logging, seguridad, transformación de datos y más, siguiendo el principio de responsabilidad única y mejorando la mantenibilidad y la claridad del código.

## Microservicios

NestJS ofrece un poderoso sistema para construir y organizar aplicaciones en una arquitectura de microservicios, facilitando la comunicación entre diferentes partes de una aplicación de manera eficiente y escalable. Los microservicios en NestJS permiten desacoplar las funcionalidades en servicios más pequeños, cada uno corriendo en su propio proceso y comunicándose entre sí a través de mecanismos de transporte como TCP, Redis, MQTT, entre otros.

**Ejemplo**:

Vamos a crear un microservicio básico en NestJS que utiliza TCP como mecanismo de transporte. Este microservicio responderá a un mensaje simple que le solicita realizar una operación de suma.

**Microservicio:**

Primero, definimos el microservicio que manejará la solicitud de suma:

```typescript
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MathService {
  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return (data || []).reduce((a, b) => a + b, 0);
  }
}
```

Luego, configuramos el microservicio en el módulo principal de la aplicación:

```typescript
import { Module } from '@nestjs/common';
import { MicroserviceModule } from '@nestjs/microservices';
import { MathService } from './math.service';

@Module({
  imports: [MicroserviceModule],
  controllers: [MathService],
})
export class AppModule {}
```

**Cliente:**

Para comunicarse con el microservicio, un cliente puede enviar un mensaje utilizando el cliente `ClientProxy` proporcionado por NestJS:

```typescript
import { Controller, Get } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Controller()
export class AppController {
  @Client({ transport: Transport.TCP })
  private client: ClientProxy;

  @Get('sum')
  async accumulate() {
    const pattern = { cmd: 'sum' };
    const data = [1, 2, 3];
    return this.client.send(pattern, data).toPromise();
  }
}
```

**Explicación**:

- **MathService**: Define un controlador para el microservicio que escucha por mensajes con el patrón `{ cmd: 'sum' }`. Al recibir un mensaje que coincide con este patrón, ejecuta el método `sum` con los datos recibidos.

- **@MessagePattern({ cmd: 'sum' })**: Este decorador asocia el patrón de mensaje `{ cmd: 'sum' }` con el método `sum`, de modo que cuando el microservicio recibe un mensaje con este patrón, sabe que debe invocar este método específico.

- **AppController**: En el lado del cliente, utilizamos `ClientProxy` para definir un cliente que puede enviar mensajes al microservicio. Usamos `@Client({ transport: Transport.TCP })` para especificar que la comunicación se hará a través de TCP. El método `accumulate` envía un mensaje al microservicio y espera por la respuesta.

Los microservicios en NestJS permiten construir aplicaciones complejas y escalables dividiéndolas en servicios más pequeños y manejables, cada uno con su propia responsabilidad. La comunicación entre servicios se maneja de manera eficiente a través de patrones y transportes definidos, facilitando la integración y el mantenimiento de la aplicación.

## Falta servicios

## Comandos de NestJS

### Instalación de NestJS

```bash
npm i -g @nestjs/cli
```

### Creación de un proyecto

```bash
nest new project-name
```

### Creación de un módulo

```bash
nest g module module-name
```

### Creación de un controlador

```bash
# Con testing
nest g controller controller-name
```

```bash
# Sin testing
nest g controller controller-name
```

### Creación de un servicio

```bash
nest g service service-name
```
