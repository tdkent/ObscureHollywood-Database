import type * as z from "zod";

export type Labels =
	| "Article"
	| "ArticleRelation"
	| "Feature"
	| "Film"
	| "FilmTag"
	| "Person"
	| "PersonFilm"
	| "Quiz"
	| "Studio"
	| "Tag";

export interface ParseJsonInputs {
	inputCsvName: string;
	label: Labels;
	schema: z.ZodObject;
}
