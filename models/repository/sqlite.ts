import { Platform } from "react-native";
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Id } from '/models/ValueObjectTemplates/Id';

export async function openDatabase(dbName: string) {
	if (Platform.OS === "web") {
		return;
	}
	if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
		await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
	}
	console.log({ documentDirectory: FileSystem.documentDirectory });
	// await FileSystem.downloadAsync(
	// 	Asset.fromModule(require(pathToDatabaseFile)).uri,
	// 	FileSystem.documentDirectory + 'SQLite/main.db'
	// );
	const raw = SQLite.openDatabase(dbName);
	if (raw) {
		console.log("Database opened:", raw);

		return new SqliteClient(raw);
	}

}
export class SqliteClient {
	constructor(
		private db: SQLite.WebSQLDatabase
	) { };
	public async createTable(tableName: string, columns: [name: string, type: string, options: string][]) {
		const que = `create table if not exists ${tableName} (${columns.map(([name, type, options]) => `${name} ${type} ${options}`).join(",")});`;
		this.db.transaction((tx) => {
			tx.executeSql(
				que,
				[],
				() => { console.log("createTable Finished"); }
			);
		});
	}
	public async get<T>(table: string, id: Id<T>): Promise<T|undefined> {
		return await new Promise((resolve, reject) => {
			this.db.transaction(tx => {
				tx.executeSql(
					`select * from ${table} where id=${id}`,
					[],
					(_, { rows: { _array } }) => resolve(_array[0])
					);
				},
				(err) => { reject(err); }
			);
		});
	}
	public async getAll<T>(table: string): Promise<T[]> {
		return await new Promise((resolve, reject) => {
			this.db.transaction(
				(tx) => {
					tx.executeSql(
						`select * from ${table};`,
						[],
						(_, { rows: { _array } }) => resolve(_array)
					);
				},
				(err) => { reject(err); }
			);
		});
	}
	public async insert<T>(table: string, _item: Partial<T>): Promise<T | undefined> {
		const que = `insert into ${table} (${Object.keys(_item).join(",")}) values (${Object.values(_item).map(val => val instanceof Date ? val.valueOf().toString() : `'${val}'`).join(",")});`;
		console.log({ que });
		return await new Promise((resolve, reject) => {
			this.db.transaction(
				tx => {
					tx.executeSql(
						que,
						[],
					);
					tx.executeSql(
						`select * from ${table};`,
						[],
						(_, { rows: { _array } }) => { resolve(_array[_array.length - 1]); console.log({ _array }); }
					);
				},
				(err) => { reject(err); }
			);
		});
	}
}
