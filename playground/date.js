const moment = require('moment');

let res=moment(new Date("2017-11-18T17:00:26.142Z")).format('HH:MM DD-MMMM-YY');

console.log(res);
var a = moment(new Date("2017-11-19T17:00:26.142Z")).subtract(2,'hours').fromNow();
console.log(a);
a = moment("2017-11-19T14:00:26.142Z").startOf("h").fromNow();
console.log(a);