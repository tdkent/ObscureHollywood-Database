import * as z from "zod";

const StudioSchema = z.object({
	name: z.string().max(64),
	slug: z.string().max(64),
});

export default StudioSchema;
