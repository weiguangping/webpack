import css from './css/index.css'
import styl from './css/black.styl'
let a = 1;
const b = "hahahah";
// var $ = require('jquery');
$("#title").click(function() {
    alert(22)
})
document.getElementById("title").innerHTML = "hello one111" + b;

var json = require('../config.json');
document.getElementById("json").innerHTML = json.name;
console.log(a, b);