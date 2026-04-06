import { DataSource } from "typeorm";
import { Article } from "./Article/Article.entity.js";
import { Film } from "./Film/Film.entity.js";
import { Person } from "./Person/Person.entity.js";
import { PersonFilm } from "./PersonFilm/PersonFilm.entity.js";
import { Studio } from "./Studio/Studio.entity.js";
import "dotenv/config";
import { ArticleRelation } from "./ArticleRelation/ArticleRelation.entity.js";
import { Feature } from "./Feature/Feature.entity.js";
import { FilmTag } from "./FilmTag/FilmTag.entity.js";
import { Tag } from "./Tag/Tag.entity.js";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: process.env["PG_PASSWORD"] as string,
	database: "oh-test",
	synchronize: true,
	logging: true,
	entities: [
		Article,
		ArticleRelation,
		FilmTag,
		Feature,
		Film,
		Person,
		PersonFilm,
		Studio,
		Tag,
	],
	subscribers: [],
	migrations: [],
});
