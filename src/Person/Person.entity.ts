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
import {
	Article,
	type Article as ArticleType,
} from "../Article/Article.entity.js";
import {
	PersonFilm,
	type PersonFilm as PersonFilmType,
} from "../PersonFilm/PersonFilm.entity.js";

@Entity()
export class Person {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		length: 64,
		unique: true,
	})
	slug: string;

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
		type: "date",
		nullable: true,
	})
	birthYear: number;

	@Column({
		type: "date",
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
