/* Environment */
require("dotenv").config();
/* /Environment */

module.exports = () => {
	const { memoryUsage } = process;
	return parseInt((memoryUsage().heapUsed / (1024 * 1024)).toFixed(1));
}