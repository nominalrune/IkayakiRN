abstract class ObjectValueBaseClass<T>{
	protected _value: T;
	constructor(value: T) {
		this._value = value;
	};
	get value(): T {
		return this._value;
	};
	public [Symbol.toPrimitive](hint: string) {
		if (hint === 'string') {
			return this.toString() ?? `[${typeof this._value} ValueObject]`;
		}
		else { // "number" or "default"
			return this.valueOf() ?? NaN;
		}
	}
}
function WithValidate<T>(validate: (value: T) => value is T) {
	return class extends ObjectValueBaseClass<T>{
		static validate = validate;
		constructor(value: T) {
			super(value);
			if (!validate(value)) {
				throw new Error(`Invalid value: ${value}`);
			}
			this._value = value;
		};
	}
}

export class Str extends ObjectValueBaseClass<string>{
	constructor(_value: string) {
		super(_value);
	}
}
export class Float extends ObjectValueBaseClass<number>{
	constructor(value: number) {
		super(value);
	}
}
export class Int extends ObjectValueBaseClass<number>{
	protected validate(value: unknown): value is number {
		return Number.isInteger(value);
	}
	constructor(value: number) {
		super(value);
	}
}
export class DateTime extends ObjectValueBaseClass<Date>{
	constructor(...params: ConstructorParameters<typeof Date>) {
		const value = new Date(...params);
		super(value);
	};
	public toString(): string {
		return this.value.toISOString();
	}
}
