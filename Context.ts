import { Id } from "./models/ValueObjectTemplates/Id";
import { Record, IRecordSqliteData } from './models/Record/Record';
import { Task, ITaskSqliteData } from './models/Task/Task';
import { User } from "./models/User/User";
import { openDatabase } from "./models/repository/sqlite";
import type { SqliteClient } from "./models/repository/sqlite";
import type { Float, Int, Str, DateTime, ValueObjectBaseClass } from "./models/ValueObjectTemplates/BaseClass";

type HasId<T> = {
	id: Id<T>;
};

class IdMap<T extends HasId<T>> extends Map<Id<T>, T> { // NOTE I don't actually know how this works, but anyhow typescript says this is ok.
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

type sqlite<T> = (
	T extends Record ? IRecordSqliteData
	: T extends Task ? ITaskSqliteData
	: never
);
type table<T> = (
	T extends Record ? "records"
	: T extends Task ? "tasks"
	: never
);

type Class = typeof Record | typeof Task;
function Static<T extends {new (...args: any): any}>(instance: InstanceType<T>) {
	// if(typeof instance === "object" && instance) return instance.constructor as T;
	// throw new Error("not instance type");
	return instance.constructor as T;
}
// function Static<T extends Class>(this: T) {
// 	return this.constructor;
// } 
export class Repository {
	private db: SqliteClient | undefined;
	public readonly records: IdMap<Record>;
	public readonly tasks: IdMap<Task>;
	constructor() {
		this.records = new IdMap();
		this.tasks = new IdMap();
	}
	async init() {
		this.db = await openDatabase("main.db");
		if (this.db) {
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
			this.records.setMany((await this.db.getAll<sqlite<Record>>("records")).map(Record.fromSqlite));
			this.tasks.setMany((await this.db.getAll<sqlite<Task>>("tasks")).map(Task.fromSqlite));
		}
		console.log({ records: this.records.values(), tasks: this.tasks.values() });
	};

	async add<T extends Record | Task>(type: table<T>, item: T):Promise<T> {
		if (this.db) {
			const _item = await this.db.insert<sqlite<T>>(type, item.toSqlite() as sqlite<T>); // TODO
			console.log({ _item });
			if (_item) {
				return (item.constructor as typeof Record|typeof Task).fromSqlite(_item as IRecordSqliteData & ITaskSqliteData) as T; // TODO
			}

			throw new Error("failed to insert");
		}
		throw new Error("no db");
	}
}
