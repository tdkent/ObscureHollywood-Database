import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export enum Theme {
	FILMS = "films",
	GENRES = "genres",
	PEOPLE = "people",
}

@Entity()
export class Quiz {
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
		length: 64,
		unique: true,
	})
	name: string;

	@Column({
		type: "enum",
		enum: Theme,
	})
	theme: Theme;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
