import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";
import { Film, type Film as FilmType } from "../Film/Film.entity.js";
import { Person, type Person as PersonType } from "../Person/Person.entity.js";

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

	@Column({
		type: "smallint",
		nullable: true,
	})
	castPosition: number;
}
