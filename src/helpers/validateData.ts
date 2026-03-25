import type { ZodObject } from "zod";

export default function validateData<T>(
	data: T[],
	schema: ZodObject,
	type: string,
) {
	for (const item of data) {
		const result = schema.safeParse(item);
		if (!result.success) {
			console.debug("Validation error in:", item);
			console.error(result.error);
			throw new Error(`Error validating ${type}!`);
		}
	}
}
