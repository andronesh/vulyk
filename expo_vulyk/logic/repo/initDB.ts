import * as SQLite from "expo-sqlite";

export const openDB = async () => {
	return await SQLite.openDatabaseAsync("vulyk");
};

export const initTables = async () => {
	const db = await openDB();
	await db.execAsync(`
      CREATE TABLE IF NOT EXISTS locations (
         id INTEGER PRIMARY KEY NOT NULL,
         title TEXT NOT NULL)
      `);
};
