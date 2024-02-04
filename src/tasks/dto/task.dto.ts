import { TaskStatus } from '../task.entity';
import {
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    title: string;
    description: string;
}

export class UpdateTaskDto {
    title?: string;
    description?: string;

    @IsString()
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status?: TaskStatus;
}
