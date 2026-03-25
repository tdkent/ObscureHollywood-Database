import * as z from "zod";

const FilmSchema = z.object({
	name: z.string().max(64),
	studio: z.string().max(64),
	releaseYear: z.preprocess((val) => {
		return Number(val);
	}, z.int().min(1890).max(2030)),
	isSilent: z.preprocess((val) => {
		if (typeof val === "string") {
			if (val.toLowerCase() === "true") return true;
			else if (val.toLowerCase() === "false") return false;
			return val;
		}
		return val;
	}, z.boolean()),
});

export default FilmSchema;
