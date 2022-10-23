export class ModelTemplate{
	protected _id: number;
	protected _createdAt: Date;
	protected _updatedAt: Date;
	protected _name: string;
	protected _email: string;
	protected _passwordHash: string;
	protected _meta: ModelTemplateMeta[];
	protected _acls: unknown[];
	constructor(data: ModelTemplateData){
		this._id = data.id;
		this._createdAt = data.createdAt;
		this._updatedAt = data.updatedAt;
		this._name = data.name;
		this._email = data.email;
		this._passwordHash = data.passwordHash;
		this._meta = data.meta;
		this._acls = data.acls;
	}
	get id(): number{
		return this._id;
	}
	get createdAt(): Date{
		return this._createdAt;
	}
	get updatedAt(): Date{
		return this._updatedAt;
	}
	get name(): string{
		return this._name;
	}
	get email(): string{
		return this._email;
	}
	get passwordHash(): string{
		return this._passwordHash;
	}
	get meta(): ModelTemplateMeta[]{
		return this._meta;
	}
	get acls(): unknown[]{
		return this._acls;
	}
	set id(value: number){
		this._id = value;
	}
	set createdAt(value: Date){
		this._createdAt = value;
	}
	set updatedAt(value: Date){
		this._updatedAt = value;
	}
	set name(value: string){
		this._name = value;
	}
	set email(value: string){
		this._email = value;
	}
	set passwordHash(value: string){
		this._passwordHash = value;
	}
	set meta(value: ModelTemplateMeta[]){
		this._meta = value;
	}
	set acls(value: unknown[]){
		this._acls = value;
	}
	public toJSON(): ModelTemplateData{
		return {
			id: this._id,
			createdAt: this._createdAt,
			updatedAt: this._updatedAt,
			name: this._name,
			email: this._email,
			passwordHash: this._passwordHash,
			meta: this._meta,
			acls: this._acls,
		};
	}
	public static fromJSON(data: ModelTemplateData): ModelTemplate{
		return new ModelTemplate(data);
	}
}
