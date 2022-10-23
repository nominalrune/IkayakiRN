import {Str, Int} from "../ValueObjectTemplates";
import {IUser}from "../User/User";

interface IRecord {
	id:Int;
	createdAt: Date;
	updatedAt:Date;
	startedAt:Date;
	finishedAt:Date;
	title:Str;
	detail:Str;
	subject:Str;
	acl:IRecordAcl;
}
interface IRecordAcl{
	recordId:Int;
	record:IRecord;
	userId:Int;
	user:IUser;
	role:Str;
}
