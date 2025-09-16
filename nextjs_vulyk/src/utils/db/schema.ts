import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const markersTable = sqliteTable("markers", {
	id: int().primaryKey({ autoIncrement: true }).notNull(),
	slug: text().notNull().unique(),
	comment: text(),
	autoInc: integer({ mode: "boolean" }).notNull().default(false),
	lastNumber: int(),
});

export type MarkerFormData = typeof markersTable.$inferInsert;
export type MarkerEntity = typeof markersTable.$inferSelect;

export const dronesTable = sqliteTable("drones", {
	id: int().primaryKey({ autoIncrement: true }),
	markerTitle: text().notNull(),
	markerNumber: text().notNull(),
	comment: text(),
});

export type DroneEntity = typeof dronesTable.$inferInsert;

export const specsTable = sqliteTable("specs", {
	id: int().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	description: text(),
});

export type SpecEntity = typeof specsTable.$inferInsert;

export const specOptionsTable = sqliteTable("spec_options", {
	id: int().primaryKey({ autoIncrement: true }),
	specId: integer("spec_id")
		.references(() => specsTable.id)
		.notNull(),
	specTitle: text("spec_title").notNull(),
	title: text().notNull(),
	shortName: text("short_name").notNull(),
	comment: text(),
});

export type SpecOptionInsertData = typeof specOptionsTable.$inferInsert;
export type SpecOptionEntity = typeof specOptionsTable.$inferSelect;

export const specGroupsTable = sqliteTable("spec_group", {
	id: int().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	comment: text(),
});

export type SpecGroupEntity = typeof specGroupsTable.$inferSelect;
export type SpecGroupFormData = typeof specGroupsTable.$inferInsert;
export type SpecGroupModel = SpecGroupEntity & {
	specIds: number[];
};

export const specGroupRelationsTable = sqliteTable("spec_group_relations", {
	id: int().primaryKey({ autoIncrement: true }),
	groupId: integer("group_id")
		.references(() => specGroupsTable.id)
		.notNull(),
	specId: integer("spec_id")
		.references(() => specsTable.id)
		.notNull(),
});

export const modelsTable = sqliteTable("models", {
	id: int().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	optionsShort: text().notNull(),
	comment: text(),
});
export type ModelFormData = typeof modelsTable.$inferInsert;
export type ModelEntity = typeof modelsTable.$inferSelect;

export const specOptionToModelRelationsTable = sqliteTable("spec_option_to_model_relations", {
	id: int().primaryKey({ autoIncrement: true }),
	modelId: integer("model_id")
		.references(() => modelsTable.id)
		.notNull(),
	optionId: integer("option_id")
		.references(() => specOptionsTable.id)
		.notNull(),
});

export const droneGroupsTable = sqliteTable("drone_groups", {
	id: int().primaryKey({ autoIncrement: true }),
	amount: integer().notNull(),
	optionsShort: text(),
	comment: text(),
	modelId: integer("model_id")
		.references(() => modelsTable.id)
		.notNull(),
});

export type DroneGroupFormData = typeof droneGroupsTable.$inferInsert;
export type DroneGroupEntity = typeof droneGroupsTable.$inferSelect;

export const specOptionToDronesGroupRelationsTable = sqliteTable("spec_option_to_drone_group_relations", {
	id: int().primaryKey({ autoIncrement: true }),
	groupId: integer("group_id")
		.references(() => droneGroupsTable.id)
		.notNull(),
	optionId: integer("option_id")
		.references(() => specOptionsTable.id)
		.notNull(),
});

export const bfDumpsTable = sqliteTable("bf_dumps", {
	id: int().primaryKey({ autoIncrement: true }),
	bfVersion: text("bf_version").notNull(),
	boardName: text("board_name").notNull(),
	boardManuf: text("board_manuf").notNull(),
	title: text().notNull(),
	content: text().notNull(),
	comment: text(),
	modelId: integer("model_id").references(() => modelsTable.id), // TODO: should be separate table with n-to-n relation?
});

export type BfDumpFormData = typeof bfDumpsTable.$inferInsert;
export type BfDumpEntity = typeof bfDumpsTable.$inferSelect;
