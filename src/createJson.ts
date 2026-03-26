import FilmSchema from "./Film/Film.schema.js";
import type { ParseJsonInputs } from "./lib/types.js";
import parseJsonFromCsv from "./lib/utils/parseJsonFromCsv.js";
import PersonSchema from "./Person/Person.schema.js";
import StudioSchema from "./Studio/Studio.schema.js";

const inputs: ParseJsonInputs[] = [
	{
		inputCsvName: "Film-Table 1",
		label: "Film",
		schema: FilmSchema,
	},
	{
		inputCsvName: "Person-Table 1",
		label: "Person",
		schema: PersonSchema,
	},
	{
		inputCsvName: "Studio-Table 1",
		label: "Studio",
		schema: StudioSchema,
	},
];

/**
 * Generate JSON db files from CSV.
 */
function createJson() {
	inputs.forEach(({ inputCsvName, label, schema }) => {
		parseJsonFromCsv({ inputCsvName, label, schema });
	});
}

createJson();
