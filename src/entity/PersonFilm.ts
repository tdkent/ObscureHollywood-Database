import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";
import { Film, type Film as FilmType } from "./Film.js";
import { Person, type Person as PersonType } from "./Person.js";

export enum Role {
	ACTOR = "actor",
	DIRECTOR = "director",
	WRITER = "writer",
}

@Entity()
@Unique(["person", "film", "role"])
export class PersonFilm {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		() => Person,
		(person) => person.personFilms,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn()
	person: PersonType;

	@ManyToOne(
		() => Film,
		(film) => film.personFilms,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn()
	film: FilmType;

	@Column({
		type: "enum",
		enum: Role,
	})
	role: Role;
}
