import {Id} from "../ValueObjectTemplates/Id";
type TaskStatus = 'todo' | 'inProgress' | 'done' | 'pending';

export interface ITask{
	id: Id<ITask>;
	createdAt: Date;
	updatedAt?: Date;
	title: string;
	description?: string;
	status: TaskStatus;
	startDate?: Date;
	endDate?: Date;
	parentTaskId?: Id<ITask>;
}

export class Task implements ITask{
	constructor(
		public title: string,
		public description: string="",
		public status: TaskStatus="todo",
		public startDate?: Date,
		public endDate?: Date,
		public parentTaskId?: Id<ITask>,
		public createdAt: Date=new Date(),
		public updatedAt?: Date,
		public id= new Id<ITask>(),
	){
	}
}
