import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const markersTable = sqliteTable("markers", {
	id: int().primaryKey({ autoIncrement: true }).notNull(),
	title: text().notNull().unique(),
	lastNumber: int().notNull(),
});

export type MarkerEntity = typeof markersTable.$inferInsert;

export const dronesTable = sqliteTable("drones", {
	id: int().primaryKey({ autoIncrement: true }),
	markerTitle: text().notNull(),
	markerNumber: text().notNull(),
	comment: text(),
});

export type DroneEntity = typeof dronesTable.$inferInsert;
