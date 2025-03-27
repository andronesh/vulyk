"use server";

import { DB } from "@/utils/db";
import {
	droneGroupsTable,
	ModelEntity,
	modelsTable,
	SpecOptionEntity,
	specOptionsTable,
	specOptionToModelRelationsTable,
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
	});
}

export type ModelWithOptionsDto = ModelEntity & {
	options: SpecOptionEntity[];
};

export async function listAllModelsWithOptions(): Promise<ModelWithOptionsDto[]> {
	const rows = await DB.select()
		.from(modelsTable)
		.leftJoin(specOptionToModelRelationsTable, eq(modelsTable.id, specOptionToModelRelationsTable.modelId))
		.leftJoin(specOptionsTable, eq(specOptionsTable.id, specOptionToModelRelationsTable.optionId))
		.all();
	const result = rows.reduce<Record<number, ModelWithOptionsDto>>((acc, row) => {
		const model = row.models;
		const option = row.spec_options;
		if (!acc[model.id]) {
			acc[model.id] = { ...model, options: [] };
		}
		if (option) {
			acc[model.id].options.push(option);
		}
		return acc;
	}, {});
	return Object.values(result);
}
