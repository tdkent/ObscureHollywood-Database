import fs from "node:fs";
import path from "node:path";
import type { Article } from "../../Article/Article.entity.js";
import type { ArticleTag } from "../../ArticleTag/ArticleTag.entity.js";
import type { Film } from "../../Film/Film.entity.js";
import type { Person } from "../../Person/Person.entity.js";
import type { PersonFilm } from "../../PersonFilm/PersonFilm.entity.js";
import type { Studio } from "../../Studio/Studio.entity.js";
import type { Tag } from "../../Tag/Tag.entity.js";
import getDirname from "./getDirname.js";

/**
 * Returns parsed JSON data.
 */
export default function getJsonData() {
	const __dirname = getDirname();

	// Label
	// Output type
	/*
	 * Get raw JSON folders
	 */
	const folderPath = "../../../data/output/json";

	const articlesFolder = path.join(__dirname, `${folderPath}/Article`);
	const articleTagFolder = path.join(__dirname, `${folderPath}/ArticleTag`);
	const filmsFolder = path.join(__dirname, `${folderPath}/Film`);
	const studiosFolder = path.join(__dirname, `${folderPath}/Studio`);
	const personsFolder = path.join(__dirname, `${folderPath}/Person`);
	const personFilmFolder = path.join(__dirname, `${folderPath}/PersonFilm`);
	const tagsFolder = path.join(__dirname, `${folderPath}/Tag`);

	/*
	 * Get JSON files from folders
	 */
	const articleFiles = fs.readdirSync(articlesFolder);
	const articleTagFiles = fs.readdirSync(articleTagFolder);
	const filmFiles = fs.readdirSync(filmsFolder);
	const studioFiles = fs.readdirSync(studiosFolder);
	const personFiles = fs.readdirSync(personsFolder);
	const personFilmFiles = fs.readdirSync(personFilmFolder);
	const tagFiles = fs.readdirSync(tagsFolder);

	/*
	 * Parse JSON files into string arrays
	 */
	const articles: Article[] = articleFiles.map((file) => {
		const filePath = path.join(articlesFolder, file);
		const raw = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(raw);
	});
	const articleTag: (ArticleTag & { articleSlug: string; tagSlug: string })[] =
		articleTagFiles.map((file) => {
			const filePath = path.join(articleTagFolder, file);
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
	const tags: Tag[] = tagFiles.map((file) => {
		const filePath = path.join(tagsFolder, file);
		const raw = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(raw);
	});

	return { articles, articleTag, films, persons, personFilm, studios, tags };
}
