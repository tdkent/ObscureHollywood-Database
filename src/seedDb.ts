import "reflect-metadata";
import { Article } from "./Article/Article.entity.js";
import { ArticleRelation } from "./ArticleRelation/ArticleRelation.entity.js";
import { AppDataSource } from "./data-source.js";
import { Feature } from "./Feature/Feature.entity.js";
import { Film } from "./Film/Film.entity.js";
import { FilmTag } from "./FilmTag/FilmTag.entity.js";
import getJsonData from "./lib/utils/getJsonData.js";
import { Person } from "./Person/Person.entity.js";
import { PersonFilm } from "./PersonFilm/PersonFilm.entity.js";
import { Studio } from "./Studio/Studio.entity.js";
import { Tag } from "./Tag/Tag.entity.js";

AppDataSource.initialize()
	.then(async () => {
		/*
		 * Get raw JSON data files.
		 */
		const {
			articles,
			articleRelation,
			features,
			films,
			filmTag,
			persons,
			personFilm,
			studios,
			tags,
		} = getJsonData();

		/*
		 * Get database repositories.
		 */
		const articleRepository = AppDataSource.getRepository(Article);
		const articleRelationRepository =
			AppDataSource.getRepository(ArticleRelation);
		const filmTagRepository = AppDataSource.getRepository(FilmTag);
		const featureRepository = AppDataSource.getRepository(Feature);
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
		 * Add relations to ArticleRelation join table and insert into database.
		 */
		const articleWithRelations = articleRelation.map((file) => {
			// Get id of current article
			const article = articlesWithId.find(
				(article) => article.slug === file.articleSlug,
			);

			if (!article) {
				console.debug(article);
				throw new Error(
					"Error creating ArticleRelation relation: could not find article id!",
				);
			}

			// Get id of related article (if any)
			const relatedArticle = articlesWithId.find(
				(article) => article.slug === file.relatedArticleSlug,
			);

			if (!relatedArticle) {
				console.debug(article);
				throw new Error(
					"Error creating ArticleRelation relation: could not find related article id!",
				);
			}

			return { article, relatedArticle };
		});

		await articleRelationRepository.save(articleWithRelations);

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
		 * Add relations to FilmTag join table and insert into database.
		 */
		const filmTagWithRelations = filmTag.map((file) => {
			const film = filmsWithId.find((film) => film.slug === file.filmSlug);

			if (!film) {
				console.debug(file);
				throw new Error(
					"Error creating FilmTag relation: could not find film!",
				);
			}

			const tag = tagsWithId.find((tag) => tag.slug === file.tagSlug);

			if (!tag) {
				console.debug(file);
				throw new Error("Error creating FilmTag relation: could not find tag!");
			}

			return { film, tag };
		});

		await filmTagRepository.save(filmTagWithRelations);

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
		 * Add relations to Feature and insert into database.
		 */
		const featuresWithRelations = features.map((feature) => {
			const article = articlesWithId.find(
				(article) => article.slug === feature.slug,
			);
			if (article) return { ...feature, article };
			return feature;
		});

		await featureRepository.save(featuresWithRelations);

		/*
		 * Add relations to PersonFilm join table and insert into database.
		 */
		const personFilmWithRelations = personFilm.map((file) => {
			const person = personsWithId.find(
				(person) => person.slug === file.personSlug,
			);

			if (!person) {
				console.debug(file);
				throw new Error(
					"Error creating PersonFilm relation: unable to find match with person",
				);
			}

			const film = filmsWithId.find((film) => film.slug === file.filmSlug);

			if (!film) {
				console.debug(file);
				throw new Error(
					"Error creating PersonFilm relation: unable to find match with film",
				);
			}

			return {
				...file,
				person,
				film,
			};
		});

		await personFilmRepository.save(personFilmWithRelations);
	})
	.catch((error) => console.log("Error: ", error));
