import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Article, type Article as ArticleType } from "./Article.js";
import { PersonFilm, type PersonFilm as PersonFilmType } from "./PersonFilm.js";
import { Studio, type Studio as StudioType } from "./Studio.js";

@Entity()
export class Film {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		length: 64,
		unique: true,
	})
	articleSlug: string;

	@Column({
		type: "varchar",
		length: 64,
	})
	studioSlug: string;

	@Column({
		type: "varchar",
		length: 64,
	})
	name: string;

	@Column({
		type: "smallint",
	})
	releaseYear: number;

	@Column({
		type: "boolean",
	})
	isSilent: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(
		() => Article,
		(article) => article.film,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn()
	article: ArticleType; // use type to avoid ReferenceError

	@ManyToOne(
		() => Studio,
		(studio) => studio.films,
	)
	studio: StudioType;

	@OneToMany(
		() => PersonFilm,
		(pf) => pf.film,
	)
	personFilms: PersonFilmType[];
}
