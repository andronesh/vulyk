import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const markersTable = sqliteTable("markers", {
	id: int().primaryKey({ autoIncrement: true }),
	title: text().notNull().unique(),
	lastNumber: int().notNull(),
});

export type MarkerEntity = typeof markersTable.$inferInsert;
