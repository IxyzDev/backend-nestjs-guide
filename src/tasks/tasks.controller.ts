import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    helloworld() {
        return 'Hello World!';
    }
}
