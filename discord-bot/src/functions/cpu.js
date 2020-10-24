/* Environment */
require("dotenv").config();
/* /Environment */

module.exports = () => {
	const { cpuUsage } = process;
	return cpuUsage().user / 10000;
}