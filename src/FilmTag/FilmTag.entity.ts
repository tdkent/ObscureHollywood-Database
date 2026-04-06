import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Film, type Film as FilmType } from "../Film/Film.entity.js";
import { Tag, type Tag as TagType } from "../Tag/Tag.entity.js";

@Entity()
@Unique(["article", "tag"])
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
		(tag) => tag.articleTags,
		{ onDelete: "CASCADE" },
	)
	tag: TagType;
}
