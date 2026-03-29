import ArticleSchema from "./Article/Article.schema.js";
import ArticleTagSchema from "./ArticleTag/ArticleTag.schema.js";
import FeatureSchema from "./Feature/Feature.schema.js";
import FilmSchema from "./Film/Film.schema.js";
import type { ParseJsonInputs } from "./lib/types.js";
import parseJsonFromCsv from "./lib/utils/parseJsonFromCsv.js";
import resetOutput from "./lib/utils/resetOutput.js";
import PersonSchema from "./Person/Person.schema.js";
import PersonFilmSchema from "./PersonFilm/PersonFilm.schema.js";
import StudioSchema from "./Studio/Studio.schema.js";
import TagSchema from "./Tag/Tag.schema.js";

const inputs: ParseJsonInputs[] = [
	{
		inputCsvName: "Article-Table 1",
		label: "Article",
		schema: ArticleSchema,
	},
	{
		inputCsvName: "Feature-Table 1",
		label: "Feature",
		schema: FeatureSchema,
	},
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
		inputCsvName: "PersonFilm-Table 1",
		label: "PersonFilm",
		schema: PersonFilmSchema,
	},
	{
		inputCsvName: "Studio-Table 1",
		label: "Studio",
		schema: StudioSchema,
	},
	{
		inputCsvName: "Tag-Table 1",
		label: "Tag",
		schema: TagSchema,
	},
	{
		inputCsvName: "ArticleTag-Table 1",
		label: "ArticleTag",
		schema: ArticleTagSchema,
	},
];

/**
 * Generate JSON db files from CSV.
 */
async function createJson() {
	await resetOutput();

	inputs.forEach(({ inputCsvName, label, schema }) => {
		parseJsonFromCsv({ inputCsvName, label, schema });
	});
}

createJson();
