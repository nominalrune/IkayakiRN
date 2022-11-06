import {IdMap} from "./IdMap";
import { Record, IRecordSqliteData } from '../Record/Record';
import { Task, ITaskSqliteData } from '../Task/Task';
import { User } from "../User/User";
import { openDatabase } from "./sqlite";
import type { SqliteClient } from "./sqlite";
import type { Float, Int, Str, DateTime, ValueObjectBaseClass } from "../ValueObjectTemplates/BaseClass";

export class Repository {
	private db: SqliteClient;
	public readonly records: IdMap<Record>;
	public readonly tasks: IdMap<Task>;
	constructor(db: SqliteClient) {
		this.db = db;
		this.records = new IdMap();
		this.tasks = new IdMap();
		
	}
	async init() {
		await this.db.createTable("records", [
			["id", "integer", "primary key autoincrement"],
			["title", "text", ""],
			["description", "text", ""],
			["createdAt", "integer", ""],
			["updatedAt", "integer", ""],
			["startedAt", "integer", ""],
			["finishedAt", "integer", ""],
			["taskId", "integer", ""],
		]);
		await this.db.createTable("record_acl", [
			["id", "integer", "primary key autoincrement"],
			["userId", "integer", ""],
			["recordId", "integer", ""],
			["create", "text", ""],
			["read", "integer", ""],
			["update", "integer", ""],
			["delete", "integer", ""],
			["share", "integer", ""],
			["createdAt", "integer", ""],
			["updatedAt", "integer", ""],
		]);
		this.records.setMany((await this.db.getAll<IRecordSqliteData>("records")).map(Record.fromSqlite));
		return this;
	}
	async add(item: Record) {
		const _item = await this.db.insert<IRecordSqliteData>("record", item.toSqlite());
		console.log({ _item });
		if (_item) {
			return Record.fromSqlite(_item);
		}
		throw new Error("failed to insert");
	}
}
