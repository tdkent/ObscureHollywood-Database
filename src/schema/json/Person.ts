import * as z from "zod";

enum Role {
	Actor = "actor",
	Director = "director",
	Writer = "writer",
}

const PersonSchema = z.object({
	firstName: z
		.string()
		.max(32)
		.transform((val) => val.toLowerCase()),
	lastName: z
		.string()
		.max(32)
		.transform((val) => val.toLowerCase()),
	filmSlug: z
		.string()
		.max(64)
		.transform((val) => val.toLowerCase()),
	role: z.preprocess(
		(val) => (typeof val === "string" ? val.toLowerCase() : val),
		z.enum(Role),
	),
});

export default PersonSchema;
