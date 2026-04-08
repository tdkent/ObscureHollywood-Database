import * as z from "zod";

const FilmTagSchema = z.object({
	filmSlug: z.string().min(1).max(64),
	tagSlug: z.string().min(1).max(64),
});

export default FilmTagSchema;
