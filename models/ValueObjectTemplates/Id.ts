import { ValueObjectBaseClass } from "./BaseClass";
export class Id<T> extends ValueObjectBaseClass<number|null> {
	validate(value: number): value is number {
		return Number.isInteger(value);
	};
	constructor(value?: number) {
		super(value ?? null);
	}
	set value(val: number) {
		if (!this.validate(val) || val < 0) {
			throw new Error(`Invalid value: ${val}`);
		}
		this._value = val;
	}
}
