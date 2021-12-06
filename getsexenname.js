const enMap = require('./rules/en.js');

/**
 * Gender detection from first name and optional language
 * @param {String} name First name
 * @return {String} male, female, null
 */
function GetSexEnName(name) {
  if (!name) {
    return null;
  }
  // Lowercase name and lang to make the match
  name = name.toLowerCase();
  const map = new Map([...enMap]),
  
  // Use the Map of input language, or use all
  // Get the gender from the language Map or try with all, otherwise is unknown
  res = map.get(name) || null
  return res;
}

module.exports = GetSexEnName;
