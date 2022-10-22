import { Record } from './Record';

export class Records{
	public records: Record[];
	constructor(){
		this.records = [];
	}
	public add(record: Record){
		this.records.push(record);
	}
	public get(id: number){
		return this.records.find(record=>record.id===id);
	}
	public remove(id: number){
		this.records = this.records.filter(record=>record.id!==id);
	}
}
