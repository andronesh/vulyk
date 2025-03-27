"use server";

import { DB } from "@/utils/db";
import {
	DroneGroupEntity,
	droneGroupsTable,
	ModelEntity,
	modelsTable,
	specOptionToDronesGroupRelationsTable,
} from "@/utils/db/schema";
import { eq } from "drizzle-orm";

export async function insertDroneGroup(
	modelId: number,
	amount: number,
	optionIds: number[],
	optionsShort?: string,
	comment?: string,
) {
	await DB.transaction(async (tx) => {
		const insertGroupResult = await tx.insert(droneGroupsTable).values({
			modelId,
			amount,
			optionsShort: optionsShort?.trim() ? optionsShort.trim() : null,
			comment: comment?.trim() ? comment.trim() : null,
		});
		const insertedGroupId = Number(insertGroupResult.lastInsertRowid);
		if (insertedGroupId) {
			for (let i = 0; i < optionIds.length; i++) {
				await tx.insert(specOptionToDronesGroupRelationsTable).values({
					groupId: insertedGroupId,
					optionId: optionIds[i],
				});
			}
		} else {
			// TODO throw error?
		}
	});
}

export type DroneGroupWithModelDto = DroneGroupEntity & {
	model: ModelEntity;
};

export async function listAllDroneGroups(): Promise<DroneGroupWithModelDto[]> {
	return (
		await DB.select()
			.from(droneGroupsTable)
			.leftJoin(modelsTable, eq(droneGroupsTable.modelId, modelsTable.id))
			.all()
	).map((row) => {
		return {
			...row.drone_groups,
			model: row.models!,
		};
	});
}
