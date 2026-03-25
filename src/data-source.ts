import { DataSource } from "typeorm";
import { Article } from "./Article/Article.entity.js";
import { Film } from "./Film/Film.entity.js";
import { Person } from "./Person/Person.entity.js";
import { PersonFilm } from "./PersonFilm/PersonFilm.entity.js";
import { Studio } from "./Studio/Studio.entity.js";
import "dotenv/config";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: process.env["PG_PASSWORD"] as string,
	database: "oh-test",
	synchronize: true,
	logging: true,
	entities: [Article, Film, Person, PersonFilm, Studio],
	subscribers: [],
	migrations: [],
});
