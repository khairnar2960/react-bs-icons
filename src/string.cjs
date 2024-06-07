/**
 * @param {string} string
 * @param {?boolean} strict
 * @returns {string}
 */
const toTitleCase = (string, strict = false) => {
    return typeof string === "string" 
        ? string.charAt(0).toUpperCase() + (
			strict ? string.slice(1).toLowerCase() : string.slice(1)
		) : string;
};


module.exports = { toTitleCase }