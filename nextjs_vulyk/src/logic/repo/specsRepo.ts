"use server";

import { DB } from "@/utils/db";
import {
	SpecEntity,
	SpecGroupModel,
	specGroupRelationsTable,
	specGroupsTable,
	SpecOptionEntity,
	specOptionsTable,
	specsTable,
} from "@/utils/db/schema";
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

export async function listAllSpecOptions(specId: number): Promise<SpecOptionEntity[]> {
	return await DB.select().from(specOptionsTable).where(eq(specOptionsTable.specId, specId));
}

export async function insertOption(
	specId: number,
	specTitle: string,
	title: string,
	shortName: string,
	comment?: string,
) {
	await DB.insert(specOptionsTable).values({
		specId,
		specTitle: specTitle.trim(),
		title: title.trim(),
		shortName: shortName.trim(),
		comment: comment?.trim() ? comment.trim() : null,
	});
}

export async function deleteOption(optionId: number) {
	await DB.delete(specOptionsTable).where(eq(specOptionsTable.id, optionId));
}

export async function updateOption(
	optionId: number,
	newTitle: string,
	newShortName: string,
	newComment?: string,
) {
	await DB.update(specOptionsTable)
		.set({ title: newTitle, shortName: newShortName, comment: newComment ? newComment : null })
		.where(eq(specOptionsTable.id, optionId));
}

export async function insertGroup(specIds: number[], title: string, comment?: string) {
	await DB.transaction(async (tx) => {
		const insertGroupResult = await tx.insert(specGroupsTable).values({
			title: title.trim(),
			comment: comment?.trim() ? comment.trim() : null,
		});
		const insertedGroupId = Number(insertGroupResult.lastInsertRowid);
		if (insertedGroupId) {
			for (let i = 0; i < specIds.length; i++) {
				await tx.insert(specGroupRelationsTable).values({
					groupId: insertedGroupId,
					specId: specIds[i],
				});
			}
		} else {
			// TODO throw error?
		}
	});
}

export async function listAllSpecGroupsWithSpecIds(): Promise<SpecGroupModel[]> {
	const rows = await DB.select()
		.from(specGroupsTable)
		.leftJoin(specGroupRelationsTable, eq(specGroupsTable.id, specGroupRelationsTable.groupId))
		.all();
	const result = rows.reduce<Record<number, SpecGroupModel>>((acc, row) => {
		const group = row.spec_group;
		const spec = row.spec_group_relations;
		if (!acc[group.id]) {
			acc[group.id] = { ...group, specIds: [] };
		}
		if (spec) {
			acc[group.id].specIds.push(spec.specId);
		}
		return acc;
	}, {});
	return Object.values(result);
}
