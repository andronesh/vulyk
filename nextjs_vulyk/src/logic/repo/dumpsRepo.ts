"use server";

import { DB } from "@/utils/db";
import { BfDumpFormData, bfDumpsTable } from "@/utils/db/schema";

export async function insertDump(dumpData: BfDumpFormData): Promise<number> {
	const insertDumpResult = await DB.insert(bfDumpsTable).values(dumpData);
	return Number(insertDumpResult.lastInsertRowid);
}
