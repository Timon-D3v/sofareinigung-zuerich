// Imports
import CONFIG from "../config.js";



/**
 * Logs a message indicating that the server is running.
 */
function listening() {
    console.log(`\x1b[34m%s\x1b[0m`, `Server is running in ${CONFIG.ENV} mode on port ${CONFIG.PORT}`);
}



// Exports
export default {
    listening
};

export {
    listening
}