import * as z from "zod";

const TagSchema = z.object({
	name: z.string().min(1).max(32),
	type: z.preprocess(
		(val) => {
			if (typeof val === "string") {
				return val.toLowerCase();
			}
			return val;
		},
		z.enum(["decade", "director", "genre", "theme"]),
	),
});

export default TagSchema;
