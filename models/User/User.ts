import { Str, Int, DateTime } from '../ValueObjectTemplates';

export interface IUser {
	id: UserId;
	createdAt: DateTime;
	updatedAt: DateTime;
	name: String;
	email: String;
	passwordHash: String;
	meta: IUserMeta[];
	acls: unknown[];
}
class UserId extends Int{}
export interface IUserMeta {
	id: Int;
	userId: Int;
	user: IUser;
	key: Str;
	value: Str;
}
