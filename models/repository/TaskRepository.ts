import { Id } from "../ValueObjectTemplates/Id";
import {IdMap} from "./IdMap";
import { Record, IRecordSqliteData } from '../Record/Record';
import { Task, ITaskSqliteData } from '../Task/Task';
import { User } from "../User/User";
import type { SqliteClient } from "./sqlite";


export class TaskRepository {
	private db: SqliteClient;
	public readonly records: IdMap<Record>;
	public readonly tasks: IdMap<Task>;
	constructor(db: SqliteClient) {
		this.db = db;
		this.records = new IdMap();
		this.tasks = new IdMap();
	}
	async init() {
		await this.db.createTable("tasks", [
			["id", "integer", "primary key autoincrement"],
			["userId", "integer", ""],
			["title", "text", ""],
			["description", "text", ""],
			["status", "text", ""],
			["createdAt", "integer", ""],
			["updatedAt", "integer", ""],
			["startDate", "integer", ""],
			["endDate", "integer", ""],
			["parentId", "integer", ""],
		]);
		await this.db.createTable("task_acl", [
			["id", "integer", "primary key autoincrement"],
			["userId", "integer", ""],
			["taskId", "integer", ""],
			["create", "text", ""],
			["read", "integer", ""],
			["update", "integer", ""],
			["delete", "integer", ""],
			["share", "integer", ""],
			["createdAt", "integer", ""],
			["updatedAt", "integer", ""],
		]);
		this.tasks.setMany((await this.db.getAll<ITaskSqliteData>("tasks")).map(Task.fromSqlite));
		return this;
	};

	async add(item: Task) {
		if (this.db) {
			const _item = await this.db.insert<ITaskSqliteData>("tasks", item.toSqlite()); // TODO
			console.log({ _item });
			if (_item) {
				return Task.fromSqlite(_item);
			}
			throw new Error("failed to insert");
		}
		throw new Error("no db");
	}
}
