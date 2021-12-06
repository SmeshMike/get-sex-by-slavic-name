const { popularNames, surnameEndings} = require('./rules/ru.js');

function GetSexRuName(Name,Surname) {
  const lowname = Name.toLowerCase();
  const lowsurname = Surname.toLowerCase();

  const genders = {
    name: null,
    surname: null,
  };

  for (const g of ["male", "female"]) {
    if (genders.name === null && popularNames[g].includes(lowname)) {
      genders.name = g;
    }
    if (
      genders.surname === null &&
      surnameEndings[g].some(v => v === lowsurname.slice(-v.length))
    ) {
      genders.surname = g;
    }
  }

  const isProbablyMale =
    genders.name === "male" ||
    genders.surname === "male"
  const isProbablyFemale =
    genders.name === "female" ||
    genders.surname === "female"

  if (isProbablyMale && !isProbablyFemale) return "male";
  if (isProbablyFemale && !isProbablyMale) return "female";
  return null;
};

module.exports = GetSexRuName;

