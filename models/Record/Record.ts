export class Record{
	public id: number;
	constructor(
		public title:string,
		public description: string="",
		public startedAt?: Date,
		public finishedAt?: Date,
		public taskId?: number,
	){
		this.id = Math.floor(Math.random()*100000);
	}
}

