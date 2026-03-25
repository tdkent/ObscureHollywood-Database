import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Article } from "../entity/Article.js";
import type { Role } from "../entity/PersonFilm.js";
import type { Studio } from "../entity/Studio.js";
import type { Film } from "../Film/Film.entity.js";
import type { Person } from "../Person/Person.entity.js";

/**
 * Get data from raw JSON files.
 */
export default function getData() {
	/*
	 * Create __dirname with ES6 syntax
	 */
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	/*
	 * Get raw JSON folders
	 */
	const articlesFolder = path.join(__dirname, "../../data/articles");
	const filmsFolder = path.join(__dirname, "../../data/films");
	const studiosFolder = path.join(__dirname, "../../data/studios");
	const personsFolder = path.join(__dirname, "../../data/persons");
	const personFilmFolder = path.join(__dirname, "../../data/person-film");

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
	const films: Film[] = filmFiles.map((file) => {
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
	const personFilm: { articleSlug: string; filmSlug: string; role: Role }[] =
		personFilmFiles.map((file) => {
			const filePath = path.join(personFilmFolder, file);
			const raw = fs.readFileSync(filePath, "utf-8");
			return JSON.parse(raw);
		});

	return { articles, films, persons, personFilm, studios };
}
