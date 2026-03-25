import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import type * as z from "zod";
import type FilmSchema from "../Film/Film.schema.js";
import slugify from "../lib/imports/slugify.js";
import getDirname from "../lib/utils/getDirname.js";
import StudioSchema from "./Studio.schema.js";

type FilmSchemaType = z.infer<typeof FilmSchema>;
type StudioSchemaType = z.infer<typeof StudioSchema>;
type StudioWithSlug = StudioSchemaType & { slug: string };

/**
 * Validate CSV data and generate Studio JSON files.
 */
export default function createStudioJson() {
	/*
	 * Get input and output paths.
	 */
	const __dirname = getDirname();
	const input = path.join(__dirname, "../../../data/csv/Film-Table 1.csv");
	const outputPath = path.join(__dirname, "../../../data/json/studios");

	/*
	 * Read the CSV data and parse to JSON.
	 */
	const file = fs.createReadStream(input);

	Papa.parse(file, {
		delimiter: ",",
		header: true,
		error: (error) => {
			console.error(error);
			throw new Error("Error parsing Film CSV to JSON!");
		},
		complete: (results) => {
			const data = results.data as unknown as FilmSchemaType[];
			const studios = data.map((film) => {
				return { name: film.studio };
			});

			/*
			 * Validate and transform parsed data.
			 */
			const validatedDataWithSlug: StudioWithSlug[] = [];

			for (const studio of studios) {
				const result = StudioSchema.safeParse(studio);
				if (!result.success) {
					console.debug("Validation error in:", studio);
					console.error(result.error);
					throw new Error(`Validation error in Studio`);
				}

				const slug = slugify(result.data.name, {
					replacement: "-",
					lower: true,
					strict: true,
					trim: true,
				});

				const addSlug = { slug, ...result.data };

				validatedDataWithSlug.push(addSlug);
			}

			/*
			 * Stringify validated data and output JSON files.
			 */
			for (const studio of validatedDataWithSlug) {
				const stringified = JSON.stringify(studio);
				fs.writeFile(
					`${outputPath}/${studio.slug}.json`,
					stringified,
					(err) => {
						if (err) console.error(err);
					},
				);
			}
		},
	});
}
