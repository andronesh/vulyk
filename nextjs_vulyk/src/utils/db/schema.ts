import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const markersTable = sqliteTable("markers", {
	id: int().primaryKey({ autoIncrement: true }).notNull(),
	title: text().notNull().unique(),
	autoInc: integer({ mode: "boolean" }).notNull().default(false),
	lastNumber: int(),
});

export type MarkerEntity = typeof markersTable.$inferInsert;

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
	title: text().notNull(),
	comment: text(),
});

export type SpecOptionInsertData = typeof specOptionsTable.$inferInsert;
export type SpecOptionEntity = typeof specOptionsTable.$inferSelect;
