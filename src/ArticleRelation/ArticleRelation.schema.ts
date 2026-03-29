import * as z from "zod";

const ArticleRelationSchema = z
	.object({
		articleSlug: z.string().min(1).max(64).toLowerCase(),
		relatedArticleSlug: z.string().min(1).max(64).toLowerCase(),
	})
	.refine((data) => data.articleSlug !== data.relatedArticleSlug, {
		message: "Article and related article cannot be the same!",
	});

export default ArticleRelationSchema;
