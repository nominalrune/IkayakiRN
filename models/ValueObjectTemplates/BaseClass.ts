export class ValueObjectBaseClass<T>{
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

function withValidate<T>(...validators: ((value: T) => value is T)[]) {
	return class WithValidate extends ValueObjectBaseClass<T>{
		validate(value:T){return validators.every(validator=>validator(value))};
		constructor(value: T) {
			super(value);
			if (!this.validate(value)) {
				throw new Error(`Invalid value: ${value}`);
			}
			this._value = value;
		};
	}
}

export class Str extends ValueObjectBaseClass<string>{
	constructor(_value: string) {
		super(_value);
	}
}
export class Float extends ValueObjectBaseClass<number>{
	constructor(value: number) {
		super(value);
	}
}

export const Int =withValidate<number>(((value: number):value is number => Number.isInteger(value)));

export class DateTime extends ValueObjectBaseClass<Date>{
	constructor(...params: ConstructorParameters<typeof Date>) {
		const value = new Date(...params);
		super(value);
	};
	public toString(): string {
		return this.value.toISOString();
	}
}
