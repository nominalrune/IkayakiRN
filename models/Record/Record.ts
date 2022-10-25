import { Str, Int, DateTime } from "../ValueObjectTemplates/BaseClass";
import { Id } from "../ValueObjectTemplates/Id";
import { IUser } from "../User/User";
import { ITask } from "../Task/Task";
import { Acl, IRole} from "../Acl/Acl";

interface IRecord {
	id: Id<IRecord>;
	createdAt?: Date;
	updatedAt?: Date;
	startedAt?: Date;
	finishedAt?: Date;
	title: string;
	detail?: string;
	userId: Id<IUser>;
	acl: Acl<IRecord>;
	taskId?: Id<ITask>;
}

export class Record implements IRecord {
	public readonly id: Id<IRecord>;
	public readonly acl: Acl<IRecord>;
	public readonly userId: Id<IUser>;
	constructor(
		{user, role}: {user:IUser, role?:Partial<IRole>},
		public title: string,
		public description: string = "",
		public startedAt?: Date,
		public finishedAt?: Date,
		public taskId?: Id<ITask>,
		id?:number
	) {
		this.id= new Id<IRecord>(id);
		this.userId= user.id;
		this.acl = new Acl<IRecord>(this.id, user.id, role);
	}
}

