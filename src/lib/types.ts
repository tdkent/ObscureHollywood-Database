import type * as z from "zod";

export interface ParseJsonInputs {
	inputCsvName: string;
	label: string;
	schema: z.ZodObject;
}
