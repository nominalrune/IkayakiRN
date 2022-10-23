import { Int } from "./BaseClass";
export class Id<T> extends Int {
	constructor(value?: number) {
		super(value ?? NaN);
	}
	set value(val: number) {
		if (!this.validate(val) || val < 0) {
			throw new Error(`Invalid value: ${val}`);
		}
		this._value = val;
	}
}
