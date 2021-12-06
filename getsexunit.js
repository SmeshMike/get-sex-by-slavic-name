const GetSexRuName = require('./getsexruname.js');
const GetSexEnName = require('./getsexenname.js');
const GetGender = require('./getsexbylvovich.js');
const cyrillictotranslit  = require('cyrillic-to-translit-js')();

function GetSex(first, last){
    let enfirst = cyrillictotranslit.transform(first)
    let res1 = GetSexEnName(enfirst);
    if(res1 !== null)
        return res1

    let rufirst = cyrillictotranslit.reverse(first)
    let rulast = cyrillictotranslit.reverse(last)
    let res2 = GetGender({first: rufirst, last:rulast});

    let res3 = GetSexRuName(rufirst, rulast);

    if([res2,res3].includes('female') && [res2,res3].includes('male'))
        return null
    else
        return  res2 || res3
}

module.exports = GetSex