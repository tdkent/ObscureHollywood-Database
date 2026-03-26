import * as z from "zod";

const PersonFilmSchema = z
	.object({
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
	})
	.superRefine((data, ctx) => {
		if (data.role === "actor") {
			if (!data.castPosition) {
				ctx.addIssue({
					message: "Actor role must have a cast position",
					code: "custom",
				});
			}
		} else {
			ctx.value.castPosition = null;
		}
	});

export default PersonFilmSchema;
