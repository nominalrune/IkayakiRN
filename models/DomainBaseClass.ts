// import { Acl } from './Acl/Acl';
// import { ITask } from './Task/Task';
// import { IUser } from './User/User';
// import { Id } from './ValueObjectTemplates/Id';


// interface DomainBaseClass<T> {
// 	public readonly id: Id<T>;
// 	public readonly userId: Id<IUser>;
// 	public readonly acl:Acl<T>
// 	toSqlite(): unknown;
// 	toJson(): string;
// }

// interface DomainBaseClassStatic<T> {
//     new():DomainBaseClass<T>;^
//     staticMethod();
// }
// can be implemented this way with the help of decorator.

// /* class decorator */
// function staticImplements<T>() {
//     return <U extends T>(constructor: U) => {constructor};
// }

// @staticImplements<MyTypeStatic>()   /* this statement implements both normal interface & static interface */
// class MyTypeClass { /* implements DomainBase{ */ /* so this become optional not required */
//     public static staticMethod() {}
//     instanceMethod() {}
// }
