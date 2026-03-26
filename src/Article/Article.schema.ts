import * as z from "zod";

const ArticleSchema = z.object({
	category: z.preprocess(
		(val) => {
			if (typeof val === "string") {
				return val.toLowerCase();
			}
			return val;
		},
		z.enum(["feature", "film", "person"]),
	),
	slug: z.string().min(1).max(64),
	htmlContent: z.string().min(1),
	textContent: z.string().min(1),
});

export default ArticleSchema;
