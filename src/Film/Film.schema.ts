import * as z from "zod";

const FilmSchema = z.object({
	name: z.string().min(1).max(64),
	sortName: z.string().min(1).max(64),
	releaseYear: z.preprocess((val) => {
		return Number(val);
	}, z.int().min(1890).max(2030)),
	studioSlug: z.string().min(1).max(64).optional(),
});

export default FilmSchema;
