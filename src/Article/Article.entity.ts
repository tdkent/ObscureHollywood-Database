import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Film, type Film as FilmType } from "../Film/Film.entity.js";
import { Person, type Person as PersonType } from "../Person/Person.entity.js";
import { Tag, type Tag as TagType } from "../Tag/Tag.entity.js";

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
		type: "varchar",
		length: 64,
		unique: true,
	})
	slug: string;

	@Column({
		type: "enum",
		enum: Category,
	})
	category: Category;

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

	@ManyToMany(
		() => Tag,
		(tag) => tag.articles,
	)
	@JoinTable()
	tags: TagType[];
}
