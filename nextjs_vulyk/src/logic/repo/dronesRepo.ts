"use server";

import { DB } from "@/utils/db";
import { eq } from "drizzle-orm";
import { DroneEntity, dronesTable } from "@/utils/db/schema";

export async function listAllDrones(): Promise<DroneEntity[]> {
	return await DB.select().from(dronesTable);
}

export async function getDronesWithMarker(markerTitle: string): Promise<DroneEntity[]> {
	return await DB.select().from(dronesTable).where(eq(dronesTable.markerTitle, markerTitle));
}

export async function createDrone(markerTitle: string, markerNumber: string, comment?: string) {
	await DB.insert(dronesTable).values({
		markerTitle: markerTitle,
		markerNumber: markerNumber,
		comment: comment ? comment : null,
	});
}
