import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Create a __dirname variable with ES6.
 */
export default function getDirname() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	return __dirname;
}
