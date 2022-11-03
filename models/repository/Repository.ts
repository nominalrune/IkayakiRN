import {Id} from "../ValueObjectTemplates/Id";
import { Record } from '../Record/Record';
import {Task}from '../Task/Task';
import {User}  from"../User/User";
import {openDatabase} from "./sqlite";
import type {SqliteClient} from "./sqlite";

type HasId<T> = {
	id:Id<T>
}
interface IRecordDataSqlite{
	id: number;
	createdAt: number;
	updatedAt: number;
	startedAt: number;
	finishedAt: number;
	title: string;
	detail: string;
	userId: number;
	taskId: number;
	
}
function recordDataToRecord(recordData:IRecordDataSqlite):Record{
	return new Record(
		{user:new User(0,0,0,"","","",[],[]), role:{}},
		recordData.title,
		recordData.detail,
		new Date(recordData.startedAt),
		new Date(recordData.finishedAt),
		new Id(recordData.taskId),
		recordData.id
	);
}

class IdMap<T extends HasId<T>> extends Map<Id<T>, T> { //NOTE this is a bit of a hack, but it works! (for now)
	constructor() {
		super();
	}
	/**
	 * sets as many as received. If any of the received items are already in the map, they will be overwritten
	 * @param {T[]} items - T[]
	 */
	setMany(items: T[]) {
		items.forEach(item => this.set(item.id, item));
	}
}

export class Repository{
	private db:SqliteClient|undefined;
	public readonly records: IdMap<Record>;
	public readonly tasks: IdMap<Task>;
	constructor(){
		this.records = new IdMap();
		this.tasks = new IdMap();
	}
	async init(){
		this.db = await openDatabase("main.db");
		if (this.db){
			await this.db.createTable("records", [
				["id","integer","primary key autoincrement"],
				["title","text",""],
				["description","text",""],
				["createdAt","integer",""],
				["updatedAt","integer",""],
				["startedAt","integer",""],
				["finishedAt","integer",""],
				["taskId","integer",""],
			]);
			await this.db.createTable("record_acl", [
				["id","integer","primary key autoincrement"],
				["userId","integer",""],
				["recordId","integer",""],
				["create","text",""],
				["read","integer",""],
				["update","integer",""],
				["delete","integer",""],
				["share","integer",""],
				["createdAt","integer",""],
				["updatedAt","integer",""],
			]);
			await this.db.createTable("tasks", [
				["id","integer","primary key autoincrement"],
				["userId","integer",""],
				["title","text",""],
				["description","text",""],
				["status","text",""],
				["createdAt","integer",""],
				["updatedAt","integer",""],
				["startDate","integer",""],
				["endDate","integer",""],
				["parentId","integer",""],
			]);
			await this.db.createTable("task_acl", [
				["id","integer","primary key autoincrement"],
				["userId","integer",""],
				["taskId","integer",""],
				["create","text",""],
				["read","integer",""],
				["update","integer",""],
				["delete","integer",""],
				["share","integer",""],
				["createdAt","integer",""],
				["updatedAt","integer",""],
			]);
			this.records.setMany((await this.db.getAll<IRecordDataSqlite>("records")).map(recordDataToRecord));
			this.tasks.setMany(await this.db.getAll<Task>("tasks"));
		}
		console.log({records:this.records.values(), tasks:this.tasks.values()});
	};
	async add<T>(type:"records"|"tasks", item:Partial<T>){
		if (this.db){
			const _item = await this.db.insert(type, {item, createdAt:new Date(),finishedAt:new Date()});
			console.log({_item});
			return recordDataToRecord(_item);
			// item.id = id;
			// this[type].set(id, item);
		}
	}
}


