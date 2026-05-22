import * as z from "zod";

const QuizSchema = z.object({
	name: z.string().min(1).max(64),
	theme: z.preprocess(
		(val) => {
			if (typeof val === "string") {
				return val.toLowerCase();
			}
			return val;
		},
		z.enum(["films", "genres", "people"]),
	),
});

export default QuizSchema;
