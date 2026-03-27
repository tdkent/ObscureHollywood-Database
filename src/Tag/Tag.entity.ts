import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import {
	Article,
	type Article as ArticleType,
} from "../Article/Article.entity.js";

enum Type {
	DECADE = "decade",
	DIRECTOR = "director",
	GENRE = "genre",
	THEME = "theme",
}

@Entity()
export class Tag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		length: 32,
		unique: true,
	})
	slug: string;

	@Column({
		type: "varchar",
		length: 32,
	})
	name: string;

	@Column({
		type: "enum",
		enum: Type,
	})
	type: Type;

	@ManyToMany(
		() => Article,
		(article) => article.tags,
	)
	articles: ArticleType[];
}
