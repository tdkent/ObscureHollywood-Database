import * as z from "zod";

const StudioSchema = z.object({
	name: z.string().min(1).max(64),
});

export default StudioSchema;
