"use server";

import { DB } from "@/utils/db";
import { MarkerEntity, markersTable } from "@/utils/db/schema";

export async function listAllMarkers(): Promise<MarkerEntity[]> {
	return await DB.select().from(markersTable);
}

export async function createMarker(title: string, startNumber: number) {
	await DB.insert(markersTable).values({
		title: title.trim().toUpperCase(),
		lastNumber: startNumber,
	});
}
