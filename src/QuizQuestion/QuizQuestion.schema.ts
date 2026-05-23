import * as z from "zod";

const QuizQuestionSchema = z.object({
	questionText: z.string().min(1).max(250),
	questionNumber: z.preprocess((val) => {
		if (typeof val === "string") {
			return Number(val);
		}
		return val;
	}, z.int().min(1).max(10)),
	// answerOptions: z.preprocess((val) => {
	// 	return JSON.parse(val as string);
	// }, z.array(z.string()).length(4)),
	answerOptions: z.string().min(1),
	correctAnswer: z.preprocess((val) => {
		if (typeof val === "string") {
			return Number(val);
		}
		return val;
	}, z.int().min(1).max(4)),
	quizSlug: z.string().min(1).max(64),
});

export default QuizQuestionSchema;
