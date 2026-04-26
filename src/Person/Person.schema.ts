import * as z from "zod";

const PersonSchema = z.object({
	firstName: z.string().min(1).max(32),
	lastName: z.string().min(1).max(32),
	birthDate: z.preprocess(
		(val) => {
			if (typeof val === "string" && !val.length) {
				return null;
			}
			return val;
		},
		z.union([z.iso.date(), z.null()]),
	),
	deathDate: z.preprocess(
		(val) => {
			if (typeof val === "string" && !val.length) {
				return null;
			}
			return val;
		},
		z.union([z.iso.date(), z.null()]),
	),
	age: z.preprocess(
		(val) => {
			if (typeof val === "string") {
				if (!val.length) {
					return null;
				}
				return Number(val);
			}
			return null;
		},
		z.union([z.int().min(10).max(110), z.null()]),
	),
	birthPlace: z
		.union([z.string().max(64), z.null()])
		.transform((val) => val || null),
	deathPlace: z
		.union([z.string().max(64), z.null()])
		.transform((val) => val || null),
});

export default PersonSchema;
