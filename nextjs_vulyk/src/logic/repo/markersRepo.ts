"use server";

import { DB } from "@/utils/db";
import { eq } from "drizzle-orm";
import { MarkerEntity, markersTable } from "@/utils/db/schema";

export async function listAllMarkers(): Promise<MarkerEntity[]> {
	return await DB.select().from(markersTable);
}

export async function createMarker(
	slug: string,
	comment: string | null,
	autoIncrement: boolean,
	lastNumber: number | null,
) {
	await DB.insert(markersTable).values({
		slug: slug.trim().toUpperCase(),
		comment: comment ? comment.trim() : null,
		autoInc: autoIncrement,
		lastNumber: autoIncrement ? lastNumber : null,
	});
}

export async function updateMarkerLastNumber(id: number, newLastNumber: number) {
	await DB.update(markersTable).set({ lastNumber: newLastNumber }).where(eq(markersTable.id, id));
}
