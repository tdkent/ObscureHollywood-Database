import fs from "node:fs/promises";
import path from "node:path";

/**
 * Use node/promises to asynchronously destroy and rebuild output folder structure.
 */
export default async function resetOutput() {
	const outputFolderPath = path.join(process.cwd(), "data", "output");

	await fs.rm(outputFolderPath, { recursive: true, force: true });
	console.log("Output folders have been deleted!");

	const dirs = [
		"csv",
		"json/Article",
		"json/ArticleTag",
		"json/Film",
		"json/Person",
		"json/PersonFilm",
		"json/Studio",
		"json/Tag",
	];

	await Promise.all(
		dirs.map((dir) =>
			fs.mkdir(path.join(outputFolderPath, dir), { recursive: true }),
		),
	);
	console.log("Output folders have been recreated!");
}
