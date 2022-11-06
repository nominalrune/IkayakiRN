import { Id } from "../ValueObjectTemplates/Id";
type HasId<T> = {
	id: Id<T>;
};

export class IdMap<T extends HasId<T>> extends Map<Id<T>, T> {
	constructor() {
		super();
	}
	/**
	 * sets as many as received. If any of the received items are already in the map, they will be overwritten
	 * @param {T[]} items - T[]
	 */
	setMany(items: T[]) {
		items.forEach(item => this.set(item.id, item));
	}
}
