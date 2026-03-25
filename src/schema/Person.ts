import * as z from "zod";

const PersonSchema = z.object({
	firstName: z.string().max(32),
	lastName: z.string().max(32),
	articleSlug: z.string().max(64),
});

export default PersonSchema;
