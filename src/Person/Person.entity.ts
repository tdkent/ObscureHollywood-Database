import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Article, type Article as ArticleType } from "../entity/Article.js";
import {
	PersonFilm,
	type PersonFilm as PersonFilmType,
} from "../entity/PersonFilm.js";

@Entity()
export class Person {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		length: 32,
	})
	firstName: string;

	@Column({
		type: "varchar",
		length: 32,
	})
	lastName: string;

	@Column({
		type: "varchar",
		length: 64,
		unique: true,
	})
	slug: string;

	@Column({
		type: "smallint",
		nullable: true,
	})
	birthYear: number;

	@Column({
		type: "smallint",
		nullable: true,
	})
	deathYear: number;

	@Column({
		type: "varchar",
		length: 64,
		nullable: true,
	})
	birthPlace: string;

	@Column({
		type: "varchar",
		length: 64,
		nullable: true,
	})
	deathPlace: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(
		() => Article,
		(article) => article.person,
		{
			nullable: true,
			onDelete: "CASCADE",
		},
	)
	@JoinColumn()
	article: ArticleType;

	@OneToMany(
		() => PersonFilm,
		(pf) => pf.person,
	)
	personFilms: PersonFilmType[];
}
