export class ValueObjectBaseClass<T>{
	protected _value: T;
	constructor(value: T) {
		this._value = value;
	};
	get value(): T {
		return this._value;
	};
	
	public [Symbol.toPrimitive](hint: "string" | "number" | "default"): string | number {
		const value= this?.valueOf() + "" ?? this._value + "";
		const objInfo=`[${typeof this._value} ValueObject]`;
		if (hint === 'string') {
			return this?.toString() ?? objInfo;
		} else if (hint === 'number') {
			return Number(value); // when the value is undefined|NaN, it's NaN. when null|false, it's 0.
		} else {
			return value || objInfo;
		}
	};
}

// function withValidate<T>(...validators: ((value: T) => value is T)[]) {
// 	return class WithValidate extends ValueObjectBaseClass<T>{
// 		validate(value:T) {
// 			return validators.every(validator=>validator(value))
// 		};
// 		constructor(value: T) {
// 			super(value);
// 			if (!this.validate(value)) {
// 				throw new Error(`Invalid value: ${value}`);
// 			}
// 			this._value = value;
// 		};
// 	}
// }

export class Str<T> extends ValueObjectBaseClass<string>{
	constructor(_value: string) {
		super(_value);
	};
}
export class Float<T> extends ValueObjectBaseClass<number>{
	constructor(value: number) {
		super(value);
	};
}

export class Int<T> extends ValueObjectBaseClass<number> {
	validate(value: number):value is number {
		return Number.isInteger(value)
	};
	constructor(value:number){
		super(value);
	};
}

export class DateTime<T> extends ValueObjectBaseClass<Date>{
	constructor(...params: ConstructorParameters<typeof Date>) {
		const value = new Date(...params);
		super(value);
	};
	public toString(): string {
		return this.value.toISOString();
	}
}
