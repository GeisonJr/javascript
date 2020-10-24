/* Environment */
require("dotenv").config();
/* /Environment */

module.exports = () => {
	const { platform } = process;
	if (platform === "win32") {
		return "Windows"
	} else {
		return undefined;
	}
}