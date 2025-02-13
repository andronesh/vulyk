"use server";

import { DB } from "@/utils/db";
import { SpecEntity, specsTable } from "@/utils/db/schema";

export async function listAllSpecs(): Promise<SpecEntity[]> {
	return await DB.select().from(specsTable);
}

export async function createSpec(title: string, description?: string) {
	await DB.insert(specsTable).values({
		title: title.trim(),
		description: description?.trim() ? description.trim() : null,
	});
}
