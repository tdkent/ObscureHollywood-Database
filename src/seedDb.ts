import "reflect-metadata";
import { Article } from "./Article/Article.entity.js";
import { AppDataSource } from "./data-source.js";
import { Film } from "./Film/Film.entity.js";
import getJsonData from "./lib/utils/getJsonData.js";
import { Person } from "./Person/Person.entity.js";
import { PersonFilm } from "./PersonFilm/PersonFilm.entity.js";
import { Studio } from "./Studio/Studio.entity.js";
import { Tag } from "./Tag/Tag.entity.js";

AppDataSource.initialize()
	.then(async () => {
		const { articles, films, persons, personFilm, studios, tags } =
			getJsonData();

		/*
		 * Get database repositories.
		 */
		const articleRepository = AppDataSource.getRepository(Article);
		const filmRepository = AppDataSource.getRepository(Film);
		const studioRepository = AppDataSource.getRepository(Studio);
		const personRepository = AppDataSource.getRepository(Person);
		const personFilmRepository = AppDataSource.getRepository(PersonFilm);
		const tagRepository = AppDataSource.getRepository(Tag);

		/*
		 * Clear all database entries.
		 */
		await AppDataSource.query(
			"TRUNCATE TABLE studio RESTART IDENTITY CASCADE;",
		);
		await AppDataSource.query("TRUNCATE TABLE tag RESTART IDENTITY CASCADE;");
		await AppDataSource.query(
			"TRUNCATE TABLE article RESTART IDENTITY CASCADE;",
		);

		/*
		 * Insert and retrieve data w/o relations.
		 */
		await articleRepository.save(articles);
		await studioRepository.save(studios);
		await tagRepository.save(tags);

		const articlesWithId = await articleRepository.find();
		const studiosWithId = await studioRepository.find();
		const tagsWithId = await tagRepository.find();

		/*
		 * Add relations to Film and insert into database.
		 */
		const filmsWithRelations = films
			.map((film) => {
				const article = articlesWithId.find(
					(article) => article.slug === film.slug,
				);
				if (article) return { ...film, article };
				return film;
			})
			.map((film) => {
				const studio = studiosWithId.find(
					(studio) => studio.slug === film.studioSlug,
				);
				if (studio) return { ...film, studio };
				return film;
			});

		await filmRepository.save(filmsWithRelations);
		const filmsWithId = await filmRepository.find();

		/*
		 * Add relations to Person and insert into database.
		 */
		const personsWithRelations = persons.map((person) => {
			const article = articlesWithId.find(
				(article) => article.slug === person.slug,
			);
			if (article) return { ...person, article };
			return person;
		});

		await personRepository.save(personsWithRelations);
		const personsWithId = await personRepository.find();

		/*
		 * Add relations to PersonFilm join table and insert into database.
		 */
		const personFilmWithRelations = personFilm.map((file) => {
			const person = personsWithId.find(
				(person) => person.slug === file.personSlug,
			);
			const film = filmsWithId.find((film) => film.slug === file.filmSlug);
			if (person && film)
				return {
					person,
					film,
					role: file.role,
					castPosition: file.castPosition,
				};
			return file;
		});

		await personFilmRepository.save(personFilmWithRelations);
	})
	.catch((error) => console.log("Error: ", error));
