import ArticleSchema from "../../Article/Article.schema.js";
import ArticleTagSchema from "../../ArticleTag/ArticleTag.schema.js";
import FeatureSchema from "../../Feature/Feature.schema.js";
import FilmSchema from "../../Film/Film.schema.js";
import PersonSchema from "../../Person/Person.schema.js";
import PersonFilmSchema from "../../PersonFilm/PersonFilm.schema.js";
import StudioSchema from "../../Studio/Studio.schema.js";
import TagSchema from "../../Tag/Tag.schema.js";
import slugify from "../imports/slugify.js";
import type { Labels } from "../types.js";

interface Inputs {
	item: unknown;
	label: Labels;
}

/**
 * Create a slug to identify a resource.
 */
export default function createSlug({ item, label }: Inputs) {
	let slugParts: string = "";

	const errMsg = `Error validating ${label} in createSlug function!`;

	/*
	 * Article schema already contains a slug field.
	 */
	if (label === "Article") {
		const result = ArticleSchema.safeParse(item);
		if (!result.success) {
			console.debug(result);
			throw new Error(errMsg);
		}

		return result.data.slug;
	}

	if (label === "ArticleTag") {
		const result = ArticleTagSchema.safeParse(item);
		if (!result.success) {
			console.debug(result);
			throw new Error(errMsg);
		}

		slugParts = `${result.data.articleSlug} ${result.data.tagSlug}`;
	}

	if (label === "Feature") {
		const result = FeatureSchema.safeParse(item);
		if (!result.success) {
			console.debug(result);
			throw new Error(errMsg);
		}

		slugParts = result.data.name;
	}

	if (label === "Film") {
		const result = FilmSchema.safeParse(item);
		if (!result.success) {
			console.debug(result);
			throw new Error(errMsg);
		}

		slugParts = `${result.data.name} ${result.data.releaseYear}`;
	}

	if (label === "Person") {
		const result = PersonSchema.safeParse(item);
		if (!result.success) {
			console.debug(result);
			throw new Error(errMsg);
		}

		slugParts = `${result.data.firstName} ${result.data.lastName}`;
	}

	if (label === "PersonFilm") {
		const result = PersonFilmSchema.safeParse(item);
		if (!result.success) {
			console.debug(result);
			throw new Error(errMsg);
		}

		slugParts = `${result.data.filmSlug} ${result.data.personSlug} ${result.data.role}`;
	}

	if (label === "Studio") {
		const result = StudioSchema.safeParse(item);
		if (!result.success) {
			console.debug(result);
			throw new Error(errMsg);
		}

		slugParts = result.data.name;
	}

	if (label === "Tag") {
		const result = TagSchema.safeParse(item);
		if (!result.success) {
			console.debug(result);
			throw new Error(errMsg);
		}

		slugParts = `${result.data.type} ${result.data.name}`;
	}

	const slug = slugify(slugParts, {
		replacement: "-",
		lower: true,
		strict: true,
		trim: true,
	});

	return slug;
}
