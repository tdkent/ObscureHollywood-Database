import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import type * as z from "zod";
import slugify from "../lib/imports/slugify.js";
import getDirname from "../lib/utils/getDirname.js";
import FilmSchema from "./Film.schema.js";

type FilmSchemaType = z.infer<typeof FilmSchema>;
type FilmWithSlug = FilmSchemaType & { slug: string };

/**
 * Validate CSV data and generate Film JSON files.
 */
export default function createFilmJson() {
	/*
	 * Get input and output paths.
	 */
	const __dirname = getDirname();
	const input = path.join(__dirname, "../../../data/input/Film-Table 1.csv");
	const jsonOutputPath = path.join(
		__dirname,
		"../../../data/output/json/films",
	);
	const csvOutputPath = path.join(__dirname, "../../../data/output/csv");

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

			/*
			 * Validate and transform parsed data.
			 */
			const validatedDataWithSlug: FilmWithSlug[] = [];

			for (const film of data) {
				const result = FilmSchema.safeParse(film);
				if (!result.success) {
					console.debug("Validation error in:", film);
					console.error(result.error);
					throw new Error(`Validation error in Film`);
				}

				const slug = slugify(`${result.data.name} ${result.data.releaseYear}`, {
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
			for (const film of validatedDataWithSlug) {
				const stringified = JSON.stringify(film);
				fs.writeFile(
					`${jsonOutputPath}/${film.slug}.json`,
					stringified,
					(err) => {
						if (err) console.error(err);
					},
				);
			}

			/*
			 * Output CSV file with slug column.
			 */
			const csv = Papa.unparse(validatedDataWithSlug);
			fs.writeFile(`${csvOutputPath}/films.csv`, csv, (err) => {
				if (err) console.error(err);
			});
		},
	});
}
