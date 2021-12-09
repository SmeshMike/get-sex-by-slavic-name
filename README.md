# get-sex-by-slavic-name
![npm](https://img.shields.io/npm/v/get-sex-by-slavic-name)![NPM](https://img.shields.io/npm/l/get-sex-by-slavic-name)

Gets gender of person by his/her name.
Algorithm based on "lvovich", "gender-detection-from-name" and "gender-rus" packages, combining their results.
Perfomance showed the 92% accuracy checking it with 50k names.

## Example

```
const GetSex = require('get-sex-by-slavic-name');

res = GetSex("Виталя", "Усинов");
console.log(res)
//male

res = GetSex("Marina", "Дабагян");
console.log(res)
//female

res = GetSex("Женя", "Антоненко");
console.log(res)
//null
```
