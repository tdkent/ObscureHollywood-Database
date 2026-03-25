import createFilmJson from "./Film/createFilmJson.js";
import createPersonJson from "./Person/createPersonJson.js";

/**
 * Generate JSON db files from CSV.
 */
function createJson() {
	createPersonJson();
	createFilmJson();
}

createJson();
