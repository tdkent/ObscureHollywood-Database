import * as z from "zod";

const PersonSchema = z.object({
	firstName: z.string().min(1).max(32),
	lastName: z.string().min(1).max(32),
	birthYear: z.preprocess(
		(val) => {
			if (typeof val === "string" && !val.length) {
				return null;
			}
			return val;
		},
		z.union([z.iso.date(), z.null()]),
	),
	deathYear: z.preprocess(
		(val) => {
			if (typeof val === "string" && !val.length) {
				return null;
			}
			return val;
		},
		z.union([z.iso.date(), z.null()]),
	),
	birthLocation: z
		.union([z.string().max(64), z.null()])
		.transform((val) => val || null),
	deathLocation: z
		.union([z.string().max(64), z.null()])
		.transform((val) => val || null),
});

export default PersonSchema;
