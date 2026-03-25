import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import type * as z from "zod";
import slugify from "../lib/imports/slugify.js";
import getDirname from "../lib/utils/getDirname.js";
import PersonSchema from "./Person.schema.js";

type PersonSchemaType = z.infer<typeof PersonSchema>;
type PersonWithSlug = PersonSchemaType & { slug: string };

/**
 * Validate CSV data and generate Person JSON files.
 */
export default function createPersonJson() {
	/*
	 * Get input and output paths.
	 */
	const __dirname = getDirname();
	const input = path.join(__dirname, "../../../data/csv/Person-Table 1.csv");
	const outputPath = path.join(__dirname, "../../../data/json/persons");

	/*
	 * Read the CSV data and parse to JSON.
	 */
	const file = fs.createReadStream(input);

	Papa.parse(file, {
		delimiter: ",",
		header: true,
		error: (error) => {
			console.error(error);
			throw new Error("Error parsing Person CSV to JSON!");
		},
		complete: (results) => {
			const data = results.data as unknown as PersonSchemaType[];

			/*
			 * Validate and transform parsed data.
			 */
			const validatedDataWithSlug: PersonWithSlug[] = [];

			for (const person of data) {
				const result = PersonSchema.safeParse(person);
				if (!result.success) {
					console.debug("Validation error in:", person);
					console.error(result.error);
					throw new Error(`Validation error`);
				}

				const slug = slugify(
					`${result.data.firstName} ${result.data.lastName}`,
					{
						replacement: "-",
						lower: true,
						strict: true,
						trim: true,
					},
				);

				const addSlug = { slug, ...result.data };

				validatedDataWithSlug.push(addSlug);
			}

			/*
			 * Stringify validated data and output JSON files.
			 */
			for (const person of validatedDataWithSlug) {
				const stringified = JSON.stringify(person);
				fs.writeFile(
					`${outputPath}/${person.slug}.json`,
					stringified,
					(err) => {
						if (err) console.error(err);
					},
				);
			}
		},
	});
}
