import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import type * as z from "zod";
import slugify from "../imports/slugify.js";
import type { ParseJsonInputs } from "../types/ParseJsonInputs.js";
import getDirname from "./getDirname.js";

/**
 * Validate and parse CSV. Generate JSON and updated CSV.
 */
export default function parseJsonFromCsv({
	inputCsvName,
	label,
	schema,
}: ParseJsonInputs) {
	/*
	 * Data types derived from Zod schema.
	 */
	type SchemaType = z.infer<typeof schema>;
	type SchemaTypeWithSlug = SchemaType & { slug: string };

	/*
	 * Get input and output paths.
	 */
	const __dirname = getDirname();
	const input = path.join(__dirname, `../../../data/input/${inputCsvName}.csv`);
	const jsonOutputPath = path.join(
		__dirname,
		`../../../data/output/json/${label}`,
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
			throw new Error(`Error parsing ${label} CSV to JSON!`);
		},
		complete: (results) => {
			const data = results.data as unknown as SchemaType[];

			/*
			 * Validate and transform parsed data.
			 */
			const validatedDataWithSlug: SchemaTypeWithSlug[] = [];

			for (const item of data) {
				const result = schema.safeParse(item);
				if (!result.success) {
					console.debug("Validation error in:", item);
					console.error(result.error);
					throw new Error(`Validation error in Film`);
				}

				// Derive slug parts with a function
				// const slugParts = getSlugParts({item, schema})

				const slug = slugify("slugParts", {
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
			for (const item of validatedDataWithSlug) {
				const stringified = JSON.stringify(item);
				fs.writeFile(
					`${jsonOutputPath}/${item.slug}.json`,
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
			fs.writeFile(`${csvOutputPath}/${label}.csv`, csv, (err) => {
				if (err) console.error(err);
			});
		},
	});
}
