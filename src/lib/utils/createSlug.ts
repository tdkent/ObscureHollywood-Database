import type * as z from "zod";
import FilmSchema from "../../Film/Film.schema.js";
import slugify from "../imports/slugify.js";

interface Inputs {
	item: unknown;
}

/**
 * Create a slug to identify a resource.
 */
export default function createSlug({ item }: Inputs) {
	console.log(item);
	let slugParts: string;

	if (FilmSchema.safeParse(item).success) {
		const film = item as z.infer<typeof FilmSchema>;
		slugParts = `${film.name} ${film.releaseYear}`;
	} else {
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
