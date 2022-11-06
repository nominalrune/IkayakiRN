import { Id } from "../ValueObjectTemplates/Id";
import { IUser, User } from "../User/User";
import {Acl, IRole}from "../Acl/Acl";

import { Str, Int, Float, DateTime } from "../ValueObjectTemplates/BaseClass";
type TaskStatus = 'todo' | 'inProgress' | 'done' | 'pending';

export interface ITask {
	id: Id<ITask>;
	title: Str<ITask>;
	description?: Str<ITask>;
	status: TaskStatus;
	startDate?: DateTime<ITask>;
	endDate?: DateTime<ITask>;
	parentTaskId?: Id<ITask>;
	parentTask?: ITask;
	userId: Id<IUser>;
	user: IUser;
	acl: Acl<ITask>;
	constructor: typeof Task;
	toSqlite(): ITaskSqliteData;
	toJson(): string;
}

export interface ITaskData {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	title: string;
	description: string;
	status: string;
	startDate?: Date;
	endDate?: Date;
	parentTaskId?: number;
	userId: number;
}
export interface ITaskSqliteData {
	id: number;
	createdAt: number;
	updatedAt: number;
	title: string;
	description: string;
	status: string;
	startDate?: number;
	endDate?: number;
	parentTaskId?: number;
	userId: number;
}

export class Task implements ITask {
	public readonly user: IUser;
	public readonly id: Id<ITask>;
	public readonly userId: Id<IUser>;
	public readonly acl:Acl<ITask>;
	constructor(
		{ user, role }: { user: IUser, role?: Partial<IRole>; },
		public title: Str<ITask>,
		public description: Str<ITask>,
		public status: TaskStatus = "todo",
		public startDate?: DateTime<ITask>,
		public endDate?: DateTime<ITask>,
		public parentTaskId?: Id<ITask>,
		public parentId?: Id<ITask>,
		id?:number,
	) {
		this.user = user;
		this.id = new Id<Task>(id);
		this.userId = user.id;
		this.acl = new Acl<ITask>(this.id, user.id, role);
	};
	public static fromSqlite(taskData: ITaskSqliteData): Task {
		return new Task(
			{ user: new User(taskData.userId, "", "", [], []), role: {} },
			new Str(taskData.title),
			new Str(taskData.description),
			taskData.status as TaskStatus,
			new DateTime(taskData.startDate||0), // TODO
			new DateTime(taskData.endDate||0), // TODO
			new Id(taskData.parentTaskId),
			new Id(taskData.id)
		);
	};
	public static fromJson(taskData: ITaskData): Task {
		return new Task(
			{ user: new User(taskData.userId, "", "",  [], []), role: {} },
			new Str(taskData.title),
			new Str(taskData.description),
			taskData.status as TaskStatus, // TODO validate!
			new DateTime(taskData.startDate||0), // TODO
			new DateTime(taskData.endDate||0), // TODO
			new Id(taskData.parentTaskId),
			new Id(taskData.id)
		);
	};
	public toSqlite(): ITaskSqliteData {
		return {
			id: this.id.value,
			title: this.title.value,
			description: this.description.value,
			status: this.status,
			startDate: this.startDate?.value.valueOf(),
			endDate: this.endDate?.value.valueOf(),
			parentTaskId: this.parentTaskId?.value,
			createdAt:0,
			updatedAt:0,
			userId: this.userId.value,
		};
	};
	public toJson(): string {
		return JSON.stringify({
			id: this.id.value,
			title: this.title.value,
			description: this.description.value,
			status: this.status,
			startDate: this.startDate?.value.valueOf(),
			endDate: this.endDate?.value.valueOf(),
			parentTaskId: this.parentTaskId?.value,
			createdAt:0,
			updatedAt:0,
			userId: this.userId.value,
		});
	}
}
