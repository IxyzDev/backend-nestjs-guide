import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 as uuid } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
    private task: Task[] = [
        {
            id: '1',
            title: 'Do something',
            description: 'Do something description',
            status: TaskStatus.DONE,
        },
    ];

    getAllTasks() {
        return this.task;
    }
    createTask(title: string, description: string) {
        const task: Task = {
            id: uuid(), //new Date().toISOString(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.task.push(task);

        return task;
    }

    getTaskById(id: string) {
        return this.task.find((task) => task.id === id);
    }

    deleteTask(id: string) {
        this.task = this.task.filter((task) => task.id !== id);
    }

    updateTask(id: string, updatefields: UpdateTaskDto): Task {
        const task = this.getTaskById(id);
        const newTask = Object.assign(task, updatefields);

        this.task.map((task) => (task.id === id ? newTask : task));

        return newTask;
    }
}
