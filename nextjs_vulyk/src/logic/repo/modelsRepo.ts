"use server";

import { DB } from "@/utils/db";
import {
	ModelEntity,
	modelsTable,
	SpecOptionEntity,
	specOptionsTable,
	specOptionToModelRelationsTable,
} from "@/utils/db/schema";
import { eq } from "drizzle-orm";

export async function insertModel(optionIds: number[], title: string, optionsShort: string, comment?: string) {
	await DB.transaction(async (tx) => {
		const insertModelResult = await tx.insert(modelsTable).values({
			title: title.trim(),
			optionsShort: optionsShort.trim(),
			comment: comment?.trim() ? comment.trim() : null,
		});
		const insertedModelId = Number(insertModelResult.lastInsertRowid);
		if (insertModelResult) {
			for (let i = 0; i < optionIds.length; i++) {
				await tx.insert(specOptionToModelRelationsTable).values({
					modelId: insertedModelId,
					optionId: optionIds[i],
				});
			}
		} else {
			// TODO throw error?
		}
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
