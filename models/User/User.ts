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

export class User{
	public readonly id: Id<IUser>;
	public readonly createdAt: DateTime;
	public readonly updatedAt: DateTime;
	public readonly name: string;
	public readonly email: string;
	public readonly passwordHash: string;
	public readonly meta: IUserMeta[];
	public readonly acls: unknown[];
	constructor(
		id: number,
		createdAt: number,
		updatedAt: number,
		name: string,
		email: string,
		passwordHash: string,
		meta: IUserMeta[],
		acls: unknown[]
	){
		this.id = new Id<IUser>(id);
		this.createdAt = new DateTime(createdAt);
		this.updatedAt = new DateTime(updatedAt);
		this.name = name;
		this.email = email;
		this.passwordHash = passwordHash;
		this.meta = meta;
		this.acls = acls;
	}
}
