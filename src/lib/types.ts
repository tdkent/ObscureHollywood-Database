import type * as z from "zod";

export type Labels =
	| "Article"
	| "Film"
	| "Person"
	| "PersonFilm"
	| "Studio"
	| "Tag";

export interface ParseJsonInputs {
	inputCsvName: string;
	label: Labels;
	schema: z.ZodObject;
}
