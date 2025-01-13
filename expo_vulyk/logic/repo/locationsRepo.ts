import { openDB } from "./initDB";
import { Location } from "../store/useLocationStore";

export const getLocations = async (): Promise<Location[]> => {
	const result: Location[] = [];
	const DB = await openDB();

	const allRows = await DB.getAllAsync("SELECT * FROM locations");
	for (const row of allRows) {
		result.push({
			id: (row as Location).id,
			title: (row as Location).title,
		});
	}
	return result;
};

export const insertLocation = async (title: string) => {
	const DB = await openDB();

	const result = DB.runSync("INSERT INTO locations (title) values (?)", title);

	return result;
};

export const deleteLocation = async (id: number) => {
	const DB = await openDB();

	const result = DB.runSync("DELETE FROM locations WHERE id=?", id);

	return result;
};
