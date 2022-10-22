import { Task } from './Task';

export class Tasks{
	public tasks: Task[];
	constructor(){
		this.tasks = [];
	}
	public add(task: Task){
		this.tasks.push(task);
	}
	public get(id: number){
		return this.tasks.find(task=>task.id===id);
	}
	public remove(id: number){
		this.tasks = this.tasks.filter(task=>task.id!==id);
	}
}
