import { getEnv } from "./config.js";
import { formatMessage } from "./utils.js";

console.log(formatMessage(`App started in ${getEnv()} mode`));
