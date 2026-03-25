import * as z from "zod";

const PersonSchema = z.object({
	firstName: z.string().max(32),
	lastName: z.string().max(32),
	birthYear: z
		.preprocess((val) => {
			if (typeof val === "string") {
				return Number(val);
			}
			return val;
		}, z.int())
		.transform((val) => val || null)
		.optional(),
	deathYear: z
		.preprocess((val) => {
			if (typeof val === "string") {
				return Number(val);
			}
			return val;
		}, z.int())
		.transform((val) => val || null)
		.optional(),
	birthLocation: z
		.string()
		.max(64)
		.optional()
		.transform((val) => val || null),
	deathLocation: z
		.string()
		.max(64)
		.optional()
		.transform((val) => val || null),
});

export default PersonSchema;
