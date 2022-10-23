import {Id} from "../ValueObjectTemplates/Id";
import { Record } from '../Record/Record';
import {Task}from '../Task/Task';

type HasId<T> = {
	id:Id<T>
}


class IdMap<T extends HasId<T>> extends Map<Id<T>, T> { //NOTE this is a bit of a hack, but it works for now
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

export class Repository{
	public readonly records: IdMap<Record>;
	public readonly tasks: IdMap<Task>;
	constructor(){
		this.records = new IdMap();
		this.tasks = new IdMap();
	}
}


