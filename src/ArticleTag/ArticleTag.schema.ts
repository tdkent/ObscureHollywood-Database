import * as z from "zod";

const ArticleTagSchema = z.object({
	articleSlug: z.string().min(1).max(64),
	tagSlug: z.string().min(1).max(64),
});

export default ArticleTagSchema;
