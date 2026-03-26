import type * as z from "zod";
import ArticleSchema from "../../Article/Article.schema.js";
import FilmSchema from "../../Film/Film.schema.js";
import PersonSchema from "../../Person/Person.schema.js";
import StudioSchema from "../../Studio/Studio.schema.js";
import slugify from "../imports/slugify.js";

interface Inputs {
	item: unknown;
}

/**
 * Create a slug to identify a resource.
 */
export default function createSlug({ item }: Inputs) {
	let slugParts: string;

	/*
	 * Article schema already contains a slug field.
	 */
	if (ArticleSchema.safeParse(item).success) {
		const article = item as z.infer<typeof ArticleSchema>;
		return article.slug;
	}

	if (FilmSchema.safeParse(item).success) {
		const film = item as z.infer<typeof FilmSchema>;
		slugParts = `${film.name} ${film.releaseYear}`;
	} else if (PersonSchema.safeParse(item).success) {
		const person = item as z.infer<typeof PersonSchema>;
		slugParts = `${person.firstName} ${person.lastName}`;
	} else if (StudioSchema.safeParse(item).success) {
		const studio = item as z.infer<typeof StudioSchema>;
		slugParts = studio.name;
	} else {
		console.debug(item);
		throw new Error("Error creating slug: invalid object");
	}

	const slug = slugify(slugParts, {
		replacement: "-",
		lower: true,
		strict: true,
		trim: true,
	});

	return slug;
}
