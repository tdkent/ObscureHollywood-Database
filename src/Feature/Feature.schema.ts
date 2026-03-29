import * as z from "zod";

const FeatureSchema = z.object({
	name: z.string().min(1).max(64),
	subtitle: z.string().min(1).max(64),
});

export default FeatureSchema;
