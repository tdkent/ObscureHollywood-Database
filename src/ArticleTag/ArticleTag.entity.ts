import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import {
	Article,
	type Article as ArticleType,
} from "../Article/Article.entity.js";
import { Tag, type Tag as TagType } from "../Tag/Tag.entity.js";

@Entity()
@Unique(["article", "tag"])
export class ArticleTag {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		() => Article,
		(article) => article.articleTags,
		{ onDelete: "CASCADE" },
	)
	article: ArticleType;

	@ManyToOne(
		() => Tag,
		(tag) => tag.articleTags,
		{ onDelete: "CASCADE" },
	)
	tag: TagType;
}
