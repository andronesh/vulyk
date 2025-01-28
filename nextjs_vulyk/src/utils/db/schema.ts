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
