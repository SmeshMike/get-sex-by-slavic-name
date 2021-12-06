var _utils = require("./rules/utils");

var _genderRules = _interopRequireDefault(require("./rules/genderRules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define, arrow-parens */
var MALE = 1;
exports.MALE = MALE;
var FEMALE = 2;
exports.FEMALE = FEMALE;
var ANDROGYNOUS = 4;
exports.ANDROGYNOUS = ANDROGYNOUS;

function getFG(str) {
  return getGenderByRuleSet(str, _genderRules.default.firstname);
}

function getLG(str) {
  return getGenderByRuleSet(str, _genderRules.default.lastname);
}

function getMG(str) {
  return getGenderByRuleSet(str, _genderRules.default.middlename);
}

function mergeGenders(g1, g2) {
  if (g1 === ANDROGYNOUS) return g2;
  if (g2 === ANDROGYNOUS) return g1;
  if (g1 === g2) return g1;
  return null;
}

function _getGender(fio) {
  var result = ANDROGYNOUS;

  if (fio.middle) {
    result = mergeGenders(result, getMG(fio.middle.trim()));
  }

  if (fio.first) {
    result = mergeGenders(result, getFG(fio.first.trim()));
  }

  if (fio.last) {
    var lastGender = getLG(fio.last.trim());

    if (lastGender !== null) {
      result = mergeGenders(result, lastGender);
    }
  }

  return result;
}

function GetGender(fio) {
  return convertGenderStr(_getGender(fio));
}

function getGenderByRuleSet(name, ruleSet) {
  if (!name || !ruleSet) {
    return null;
  }

  var nameLower = name.toLowerCase();

  if (ruleSet.exceptions) {
    var gender = getGenderByRule(ruleSet.exceptions, function (some) {
      if ((0, _utils.startsWith)(some, '-')) {
        return (0, _utils.endsWith)(nameLower, some.substr(1));
      }

      return some === nameLower;
    });
    if (gender) return gender;
  }

  return ruleSet.suffixes ? getGenderByRule(ruleSet.suffixes, function (some) {
    return (0, _utils.endsWith)(nameLower, some);
  }) : null;
}

function getGenderByRule(rules, matchFn) {
  var genders = Object.keys(rules).filter(function (genderKey) {
    var array = rules[genderKey];
    return Array.isArray(array) && array.some(matchFn);
  });

  if (genders.length !== 1) {
    // DEBUG SEVERAL RULES
    Object.keys(rules).forEach(function (genderKey) {
      var array = rules[genderKey];

      if (Array.isArray(array) && array.some(matchFn)) {// eslint-disable-next-line
        // console.log(genderKey, array);
      }
    });
    return null;
  }

  return getGenderConst(genders[0]);
}

function getGenderConst(key) {
  switch (key) {
    case 'male':
    case MALE:
      return MALE;

    case 'female':
    case FEMALE:
      return FEMALE;

    case 'androgynous':
    case ANDROGYNOUS:
      return ANDROGYNOUS;

    default:
      return null;
  }
}


function convertGenderStr(cnst) {
  switch (cnst) {
    case 'male':
    case MALE:
      return 'male';

    case 'female':
    case FEMALE:
      return 'female';

    case 'androgynous':
    case ANDROGYNOUS:
      return null;

    default:
      return null;
  }
}

module.exports = GetGender