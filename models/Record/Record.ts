import { Str, DateTime } from "../ValueObjectTemplates/BaseClass";
import { Id } from "../ValueObjectTemplates/Id";
import { IUser } from "../User/User";
import { ITask } from "../Task/Task";
import { Acl, IRole } from "../Acl/Acl";
import { User } from "../User/User";

interface IRecord {
	id: Id<IRecord>;
	createdAt?: DateTime<IRecord>;
	updatedAt?: DateTime<IRecord>;
	startedAt?: DateTime<IRecord>;
	finishedAt?: DateTime<IRecord>;
	title: Str<IRecord>;
	description?: Str<IRecord>;
	userId: Id<IUser>;
	user: IUser;
	acl: Acl<IRecord>;
	taskId?: Id<ITask>;
	task?: ITask;
	toSqlite(): IRecordSqliteData;
	toJson(): string;
}
export interface IRecordData {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	startedAt: Date;
	finishedAt: Date;
	title: string;
	description: string;
	userId: number;
	taskId: number;
}
export interface IRecordSqliteData {
	id: number;
	createdAt: number;
	updatedAt: number;
	startedAt: number;
	finishedAt: number;
	title: string;
	description: string;
	userId: number;
	taskId: number;
}
export class Record implements IRecord {
	public readonly id: Id<IRecord>;
	public readonly acl: Acl<IRecord>;
	public readonly userId: Id<IUser>;
	public readonly user: IUser;
	constructor(
		{ user, role }: { user: IUser, role?: Partial<IRole>; },
		public title: Str<IRecord>,
		public description: Str<IRecord> = new Str(""),
		public startedAt?: DateTime<IRecord>,
		public finishedAt?: DateTime<IRecord>,
		public taskId?: Id<ITask>,
		id?: number
	) {
		this.user = user;
		this.id = new Id<IRecord>(id);
		this.userId = user.id;
		this.acl = new Acl<IRecord>(this.id, user.id, role);
	}
	public static fromSqlite(recordData: IRecordSqliteData): Record {
		return new Record(
			{ user: new User(recordData.userId, "", "",  [], []), role: {} },
			new Str(recordData.title),
			new Str(recordData.description),
			new DateTime(new Date(recordData.startedAt)),
			new DateTime(new Date(recordData.finishedAt)),
			new Id(recordData.taskId),
			recordData.id
		);
	}
	// public static fromJson(recordData: IRecordData): Record {
	// 	return new Record(
	// 		{ user: new User(recordData.userId, "", "",  [], []), role: {} }, // TODO
	// 		new Str(recordData.title??""),
	// 		new Str(recordData.description??""),
	// 		new DateTime(new Date(recordData.startedAt??Date())),
	// 		new DateTime(new Date(recordData.finishedAt??Date())),
	// 		new Id(recordData.taskId),
	// 		recordData.id
	// 	);
	// };
	public static fromForm(recordData: Partial<IRecordData>): Record {
		return new Record(
			{ user: new User(recordData.userId ?? 0, "", "",  [], []), role: {} }, // TODO
			new Str(recordData.title??""),
			new Str(recordData.description??""),
			new DateTime(new Date(recordData.startedAt??Date())),
			new DateTime(new Date(recordData.finishedAt??Date())),
			new Id(recordData.taskId),
			recordData.id
		);
	};
	public toSqlite(): IRecordSqliteData {
		return {
			// TODO
		}as IRecordSqliteData;
	}
	public toJson(): string {
		return JSON.stringify(this); // TODO
	}
}

