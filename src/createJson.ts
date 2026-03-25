/**
 * Generate JSON files to generate Person database entries.
 * Generate JSON files to generate PersonFilm database entries.
 */

import fs from "fs";
import Papa from "papaparse";
import path from "path";
import { fileURLToPath } from "url";
import type * as z from "zod";
import slugify from "./imports/slugify.js";
import PersonSchema from "./schema/json/Person.js";

type PersonType = z.infer<typeof PersonSchema>;
type PersonWithSlug = PersonType & { articleSlug: string };

/*
 * Create a __dirname with ES6 and get input and output paths.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = path.join(
	__dirname,
	"../data/input/obscure-hollywood/persons.csv",
);
const personOutputPath = path.join(
	__dirname,
	"../data/output/obscure-hollywood/person",
);
const personFilmOutputPath = path.join(
	__dirname,
	"../data/output/obscure-hollywood/person-film",
);

/*
 * Read data from the input file.
 */
const file = fs.createReadStream(input);

Papa.parse(file, {
	delimiter: ",",
	header: true,
	error: (error) => {
		console.error(error);
	},
	complete: (results) => {
		const data = results.data as unknown as PersonType[];

		/*
		 * Validate and transform parsed data.
		 */
		const validatedData: PersonWithSlug[] = [];

		for (const person of data) {
			const result = PersonSchema.safeParse(person);
			if (!result.success) {
				console.debug("Validation error in:", person);
				console.error(result.error);
				throw new Error(`Validation error`);
			}

			const articleSlug = slugify(
				`${result.data.firstName} ${result.data.lastName}`,
				{
					replacement: "-",
					lower: true,
					strict: true,
					trim: true,
				},
			);

			const updatedData = { articleSlug, ...result.data };

			validatedData.push(updatedData);
		}

		/*
		 * Use Map to de-duplicate data to avoid redundant Person file writes.
		 */
		const personMap = new Map<string, PersonWithSlug>();
		for (const person of validatedData) {
			personMap.set(person.articleSlug, person);
		}

		/*
		 * Output Person JSON files.
		 */
		for (const [_key, value] of personMap) {
			const personData = {
				firstName: value.firstName,
				lastName: value.lastName,
				articleSlug: value.articleSlug,
			};
			const stringifyPerson = JSON.stringify(personData);
			fs.writeFile(
				`${personOutputPath}/${value.articleSlug}.json`,
				stringifyPerson,
				(err) => {
					if (err) console.log(err);
				},
			);
		}

		/*
		 * Output PersonFilm JSON files.
		 */

		for (const person of validatedData) {
			const personFilmData = {
				articleSlug: person.articleSlug,
				filmSlug: person.filmSlug,
				role: person.role,
			};
			const stringifyPersonFilm = JSON.stringify(personFilmData);
			fs.writeFile(
				`${personFilmOutputPath}/${personFilmData.filmSlug}-${personFilmData.articleSlug}-${personFilmData.role}.json`,
				stringifyPersonFilm,
				(err) => {
					if (err) console.log(err);
				},
			);
		}
	},
});
