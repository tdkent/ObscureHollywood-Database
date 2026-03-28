import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {
	ArticleTag,
	type ArticleTag as ArticleTagType,
} from "../ArticleTag/ArticleTag.entity.js";

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

	@OneToMany(
		() => ArticleTag,
		(articleTag) => articleTag.tag,
	)
	articleTags: ArticleTagType[];
}
