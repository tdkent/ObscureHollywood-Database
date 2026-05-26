import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Quiz, type Quiz as QuizType } from "../Quiz/Quiz.entity.js";

@Entity()
export class QuizResult {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		length: 64,
	})
	userId: string;

	@Column({
		type: "smallint",
	})
	score: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(
		() => Quiz,
		(quiz) => quiz.quizResult,
	)
	quiz: QuizType;
}
