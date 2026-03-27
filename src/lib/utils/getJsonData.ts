import fs from "node:fs";
import path from "node:path";
import type { Article } from "../../Article/Article.entity.js";
import type { Film } from "../../Film/Film.entity.js";
import type { Person } from "../../Person/Person.entity.js";
import type { PersonFilm } from "../../PersonFilm/PersonFilm.entity.js";
import type { Studio } from "../../Studio/Studio.entity.js";
import getDirname from "./getDirname.js";

/**
 * Returns parsed JSON data.
 */
export default function getJsonData() {
	const __dirname = getDirname();

	/*
	 * Get raw JSON folders
	 */
	const articlesFolder = path.join(
		__dirname,
		"../../../data/output/json/Article",
	);
	const filmsFolder = path.join(__dirname, "../../../data/output/json/Film");
	const studiosFolder = path.join(
		__dirname,
		"../../../data/output/json/Studio",
	);
	const personsFolder = path.join(
		__dirname,
		"../../../data/output/json/Person",
	);
	const personFilmFolder = path.join(
		__dirname,
		"../../../data/output/json/PersonFilm",
	);

	/*
	 * Get JSON files from folders
	 */
	const articleFiles = fs.readdirSync(articlesFolder);
	const filmFiles = fs.readdirSync(filmsFolder);
	const studioFiles = fs.readdirSync(studiosFolder);
	const personFiles = fs.readdirSync(personsFolder);
	const personFilmFiles = fs.readdirSync(personFilmFolder);

	/*
	 * Parse JSON files into string arrays
	 */
	const articles: Article[] = articleFiles.map((file) => {
		const filePath = path.join(articlesFolder, file);
		const raw = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(raw);
	});
	const films: (Film & { studioSlug: string })[] = filmFiles.map((file) => {
		const filePath = path.join(filmsFolder, file);
		const raw = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(raw);
	});
	const studios: Studio[] = studioFiles.map((file) => {
		const filePath = path.join(studiosFolder, file);
		const raw = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(raw);
	});
	const persons: Person[] = personFiles.map((file) => {
		const filePath = path.join(personsFolder, file);
		const raw = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(raw);
	});
	const personFilm: (PersonFilm & { personSlug: string; filmSlug: string })[] =
		personFilmFiles.map((file) => {
			const filePath = path.join(personFilmFolder, file);
			const raw = fs.readFileSync(filePath, "utf-8");
			return JSON.parse(raw);
		});

	return { articles, films, persons, personFilm, studios };
}
