import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.WebSQLDatabase> {
	if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
	  await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
	}
	await FileSystem.downloadAsync(
	  Asset.fromModule(require(pathToDatabaseFile)).uri,
	  FileSystem.documentDirectory + 'SQLite/myDatabaseName.db'
	);
	return SQLite.openDatabase('myDatabaseName.db');
  }
export class SqliteObject{
	public async get<T>(itemName:string):Promise<T[]>{
		const tasks= await openDatabase('./assets/database.sqlite').then(db => {
			let tasks : T[] = [];
			db.transaction(tx => {
			  tx.executeSql(
				`select * from ${itemName}`,
				[itemName],
				(_, { rows: { _array } }) => tasks=_array
			  );
			});
			return tasks;
		  });
		return tasks;
	}
}
