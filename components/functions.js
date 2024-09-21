// Imports
import crypto from "crypto";
import CONFIG from "../config.js";



/**
 * Logs a message indicating that the server is running.
 */
export function listening() {
    console.log(`\x1b[34m%s\x1b[0m`, `Server is running in ${CONFIG.ENV} mode on port ${CONFIG.PORT}`);
}

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} - A random integer between the specified minimum and maximum values.
 */
export function getRandomInt(min, max) {
    const range = max - min + 1;
    const maxUint32 = 0xFFFFFFFF;
    let randomInt;
    do {
        const buffer = crypto.randomBytes(4);
        randomInt = buffer.readUInt32BE(0);
    } while (randomInt > maxUint32 - (maxUint32 % range));
    return min + (randomInt % range);
};



// Exports
export default {
    listening,
    getRandomInt
}