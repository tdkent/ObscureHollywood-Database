import type * as z from "zod";

export type Labels = "Article" | "Film" | "Person" | "PersonFilm" | "Studio";

export interface ParseJsonInputs {
	inputCsvName: string;
	label: Labels;
	schema: z.ZodObject;
}
