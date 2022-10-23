import {Str, Int, DateTime} from "../ValueObjectTemplates";
import {IUser} from "../User/User";
export interface IAcl<T>{
	objectId:Int;
	object:T;
	userId:Int;
	user:IUser;
	role:IRole;
}

export interface IRole{
	id:Int;
	title:Str;
	description:Str;
}
