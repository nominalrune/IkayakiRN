import { Str, Int, DateTime } from '../ValueObjectTemplates/BaseClass';
import { Id } from '../ValueObjectTemplates/Id';

export interface IUser {
	id: Id<IUser>;
	createdAt: DateTime;
	updatedAt: DateTime;
	name: string;
	email: string;
	passwordHash: string;
	meta: IUserMeta[];
	acls: unknown[];
}
export interface IUserMeta {
	id: Id<IUserMeta>;
	userId: number;
	user: IUser;
	key: string;
	value: string;
}
