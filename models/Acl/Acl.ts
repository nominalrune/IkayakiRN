import { Str, Int, DateTime } from "/models/ValueObjectTemplates/BaseClass";
import { Id } from "/models/ValueObjectTemplates/Id";
import { IUser } from "/models/User/User";
export interface IAcl<T> {
	objectId: Id<T>;
	userId: Id<IUser>;
	role: IRole;
}

export interface IRole {
	create: boolean;
	read: boolean;
	update: boolean;
	delete: boolean;
	share: boolean;
}

export class Acl<T> implements IAcl<T> {
	public readonly role: IRole
	constructor(
		public readonly objectId: Id<T>,
		public readonly userId: Id<IUser>,
		{create, read, update, delete:_delete, share}: Partial<IRole> ={create:false, read:false, update:false, delete:false, share:false}
	) {
		this.role = {
			create: create || false,
			read: read || false,
			update: update || false,
			delete: _delete || false,
			share: share || false
		};
	}
}
