import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    getAllTasks() {
        return 'Hello World!';
    }
    createTask() {}
    updateTask() {}
    deleteTask() {}
}
