import * as z from "zod";

const PersonFilmSchema = z.object({
	filmSlug: z.string().min(1).max(64),
	personSlug: z.string().min(1).max(64),
	role: z.preprocess(
		(val) => {
			if (typeof val === "string") {
				return val.toLowerCase();
			}
			return val;
		},
		z.enum(["actor", "director", "writer"]),
	),
	castPosition: z.preprocess(
		(val) => {
			if (typeof val === "string") {
				if (!val.length) return null;
				return Number(val);
			}
			return val;
		},
		z.union([z.int().min(1).max(5), z.null()]),
	),
});

export default PersonFilmSchema;
