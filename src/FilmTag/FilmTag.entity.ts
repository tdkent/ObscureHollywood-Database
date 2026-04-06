import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Film, type Film as FilmType } from "../Film/Film.entity.js";
import { Tag, type Tag as TagType } from "../Tag/Tag.entity.js";

@Entity()
@Unique(["film", "tag"])
export class FilmTag {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		() => Film,
		(film) => film.filmTags,
		{ onDelete: "CASCADE" },
	)
	film: FilmType;

	@ManyToOne(
		() => Tag,
		(tag) => tag.filmTags,
		{ onDelete: "CASCADE" },
	)
	tag: TagType;
}
