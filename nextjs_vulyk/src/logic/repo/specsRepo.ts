"use server";

import { DB } from "@/utils/db";
import { SpecEntity, specOptionsTable, specsTable } from "@/utils/db/schema";
import { eq } from "drizzle-orm";

export async function listAllSpecs(): Promise<SpecEntity[]> {
	return await DB.select().from(specsTable);
}

export async function createSpec(title: string, description?: string) {
	await DB.insert(specsTable).values({
		title: title.trim(),
		description: description?.trim() ? description.trim() : null,
	});
}

export async function listAllSpecOptions(specId: number): Promise<SpecEntity[]> {
	return await DB.select().from(specOptionsTable).where(eq(specOptionsTable.specId, specId));
}

export async function insertOption(specId: number, title: string, comment?: string) {
	await DB.insert(specOptionsTable).values({
		specId,
		title: title.trim(),
		comment: comment?.trim() ? comment.trim() : null,
	});
}

export async function deleteOption(optionId: number) {
	await DB.delete(specOptionsTable).where(eq(specOptionsTable.id, optionId));
}

export async function updateOption(optionId: number, newTitle: string, newComment?: string) {
	await DB.update(specOptionsTable)
		.set({ title: newTitle, comment: newComment ? newComment : null })
		.where(eq(specOptionsTable.id, optionId));
}
