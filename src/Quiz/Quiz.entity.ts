import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { QuizQuestion } from "../QuizQuestion/QuizQuestion.entity.js";
import { QuizResult } from "../QuizResult/QuizResult.entity.js";

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

	@OneToMany(
		() => QuizQuestion,
		(qq) => qq.quiz,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn()
	quizQuestions: QuizQuestion[];

	@OneToMany(
		() => QuizResult,
		(qr) => qr.quiz,
		{
			onDelete: "CASCADE",
		},
	)
	quizResult: QuizResult;
}
