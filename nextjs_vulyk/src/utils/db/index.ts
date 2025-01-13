import { drizzle } from "drizzle-orm/libsql";

export const DB = drizzle({
	connection: {
		url: process.env.TURSO_DATABASE_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
});
