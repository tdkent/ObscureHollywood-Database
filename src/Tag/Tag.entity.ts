import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Type {
	DECADE = "decade",
	DIRECTOR = "director",
	GENRE = "genre",
	THEME = "theme",
}

@Entity()
export class Tag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		length: 32,
	})
	name: string;

	@Column({
		type: "varchar",
		length: 32,
		unique: true,
	})
	slug: string;

	@Column({
		type: "enum",
		enum: Type,
	})
	type: Type;
}
