import * as z from "zod";

const ArticleSchema = z.object({
	category: z.enum(["feature", "film", "person"]),
	slug: z.string().max(64),
	htmlContent: z.string().min(1),
	textContent: z.string().min(1),
});

export default ArticleSchema;
