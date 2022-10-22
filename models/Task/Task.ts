type TaskStatus = 'todo' | 'inProgress' | 'done' | 'pending';

export class Task{
	public id: number;
	constructor(
		public title: string,
		public description: string="",
		public status: TaskStatus="todo",
		public startDate?: Date,
		public endDate?: Date,
		public parentTaskId?: number,
	){
		this.id = Math.floor(Math.random()*100000);
	}
}
