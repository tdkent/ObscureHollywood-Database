import createFilmJson from "./Film/createFilmJson.js";
import createPersonJson from "./Person/createPersonJson.js";
import createStudioJson from "./Studio/createStudioJson.js";

/**
 * Generate JSON db files from CSV.
 */
function createJson() {
	createPersonJson();
	createFilmJson();
	createStudioJson();
}

createJson();
