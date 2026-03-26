import type * as z from "zod";
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
