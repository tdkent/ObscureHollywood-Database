import {
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Film, type Film as FilmType } from "../Film/Film.entity.js";
import { Person, type Person as PersonType } from "../Person/Person.entity.js";

export enum Category {
	FEATURE = "feature",
	FILM = "film",
	PERSON = "person",
}

@Entity()
export class Article {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "enum",
		enum: Category,
	})
	category: Category;

	@Column({
		type: "varchar",
		length: 64,
		unique: true,
	})
	slug: string;

	@Column({
		type: "text",
	})
	htmlContent: string;

	@Column({
		type: "text",
	})
	textContent: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(
		() => Film,
		(film) => film.article,
	)
	film: FilmType;

	@OneToOne(
		() => Person,
		(person) => person.article,
	)
	person: PersonType;
}
