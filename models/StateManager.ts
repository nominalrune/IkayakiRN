import { Record } from './Record/Record';
import { Records } from './Record/Records';
import { Task, Tasks } from './Task/index';

export class StateManager{
	public Records: Records;
	public records(): Record[]{
		return this.Records.records;
	}
	public Tasks: Tasks;
	public tasks(): Task[]{
		return this.Tasks.tasks;
	}
	constructor(){
		this.Records = new Records();
		this.Tasks = new Tasks();
	}
}
