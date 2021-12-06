exports.endsWith = endsWith;
exports.startsWith = startsWith;

function endsWith(str, search) {
  var strLength = str.length;
  return str.substring(strLength - search.length, strLength) === search;
}

function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}