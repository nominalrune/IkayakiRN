import { Str, Int, DateTime } from '../ValueObjectTemplates/BaseClass';
import { Id } from '../ValueObjectTemplates/Id';

export interface IUser {
	id: Id<IUser>;
	createdAt?: DateTime<IUser>;
	updatedAt?: DateTime<IUser>;
	name: Str<IUser>;
	email: Str<IUser>;
	passwordHash?: Str<IUser>;
	meta?: IUserMeta[];
	acls?: unknown[];
}
export interface IUserMeta {
	id: Id<IUserMeta>;
	userId: Id<IUser>;
	user: IUser;
	key: Str<IUser>;
	value: Str<IUser>;
}

export class User{
	public readonly id: Id<IUser>;
	public readonly createdAt?: DateTime<IUser>;
	public readonly updatedAt?: DateTime<IUser>;
	public readonly name: Str<IUser>;
	public readonly email: Str<IUser>;
	public readonly passwordHash?: Str<IUser>;
	public readonly meta: IUserMeta[];
	public readonly acls: unknown[];
	constructor(
		id: number,
		name: string,
		email: string,
		meta: IUserMeta[],
		acls: unknown[]
	){
		this.id = new Id<IUser>(id);
		this.name = new Str(name);
		this.email = new Str(email);
		this.meta = meta;
		this.acls = acls;
	}
}
