import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import { Article } from "./entity/Article.js";
import { Film } from "./entity/Film.js";
import { Person } from "./entity/Person.js";
import { PersonFilm } from "./entity/PersonFilm.js";
import { Studio } from "./entity/Studio.js";
import getData from "./helpers/getData.js";
import validateData from "./helpers/validateData.js";
import ArticleSchema from "./schema/Article.js";
import FilmSchema from "./schema/Film.js";
import PersonSchema from "./schema/Person.js";
import StudioSchema from "./schema/Studio.js";

AppDataSource.initialize()
	.then(async () => {
		/*
		 * Get data from JSON.
		 */
		const { articles, films, persons, personFilm, studios } = getData();

		/*
		 * Validate data.
		 */
		validateData<Article>(articles, ArticleSchema, "article");
		validateData<Film>(films, FilmSchema, "film");
		validateData<Studio>(studios, StudioSchema, "studio");
		validateData<Person>(persons, PersonSchema, "person");

		/*
		 * Database repositories
		 */
		const articleRepository = AppDataSource.getRepository(Article);
		const filmRepository = AppDataSource.getRepository(Film);
		const studioRepository = AppDataSource.getRepository(Studio);
		const personRepository = AppDataSource.getRepository(Person);
		const personFilmRepository = AppDataSource.getRepository(PersonFilm);

		/*
		 * Cascade delete from database
		 */
		await AppDataSource.query(
			"TRUNCATE TABLE studio RESTART IDENTITY CASCADE;",
		);
		await AppDataSource.query(
			"TRUNCATE TABLE article RESTART IDENTITY CASCADE;",
		);

		/*
		 * Insert articles into db, then get articles.
		 */
		await articleRepository.save(articles);
		const articlesWithId = await articleRepository.find();

		/*
		 * Insert studios into db, then get studios.
		 */
		await studioRepository.save(studios);
		const studiosWithId = await studioRepository.find();

		/*
		 * Insert persons into db, then get studios.
		 */
		await personRepository.save(persons);
		const personsWithId = await personRepository.find();

		/*
		 * Add article and studio entities to each film.
		 */
		const filmsWithRelations = films
			.map((film) => {
				const article = articlesWithId.find(
					(article) => article.slug === film.articleSlug,
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

		/*
		 * Insert films into db, then get films.
		 */
		await filmRepository.save(filmsWithRelations);
		const filmsWithId = await filmRepository.find();

		const personFilmWithRelations = personFilm.map((file) => {
			const person = personsWithId.find(
				(person) => person.articleSlug === file.articleSlug,
			);
			const film = filmsWithId.find(
				(film) => film.articleSlug === file.filmSlug,
			);
			if (person && film) return { person, film, role: file.role };
			return file;
		});

		await personFilmRepository.save(personFilmWithRelations);
	})
	.catch((error) => console.log("Error: ", error));
