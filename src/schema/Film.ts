import * as z from "zod";

const FilmSchema = z.object({
	articleSlug: z.string().max(64),
	studioSlug: z.string().max(64),
	name: z.string().max(64),
	releaseYear: z.int().min(1890).max(2030),
	isSilent: z.boolean(),
});

export default FilmSchema;
