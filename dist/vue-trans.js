!function(e,a){"object"==typeof exports&&"object"==typeof module?module.exports=a():"function"==typeof define&&define.amd?define([],a):"object"==typeof exports?exports["vue-trans"]=a():e["vue-trans"]=a()}("undefined"!=typeof self?self:this,function(){return function(e){function __webpack_require__(s){if(a[s])return a[s].exports;var r=a[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}var a={};return __webpack_require__.m=e,__webpack_require__.c=a,__webpack_require__.d=function(e,a,s){__webpack_require__.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:s})},__webpack_require__.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return __webpack_require__.d(a,"a",a),a},__webpack_require__.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(e,a,s){"use strict";var r=s(1),c=function(e){return e&&e.__esModule?e:{default:e}}(r),t=function(e){if(e.filter("trans"))return void console.warn("[filter duplication]: There is already a filter named `trans` registered");e.filter("trans",c.default)};"undefined"!=typeof window&&window.Vue&&Vue.install(t),e.exports=t},function(e,a,s){"use strict";function pluralize(e,a,s){for(var u=e.split(n),o=void 0,i=[],_=[],f=[],l=0;l<u.length;l++){var p=u[l];c.test(p)?(i=p.match(c),f[i[0]]=i[i.length-1]):r.test(_part)?(i=p.match(r),_.push(i[1])):_.push(p)}for(o in f)if(t.test(o))if(i=o.match(t),i[1]){var d=i[2].split(","),b=void 0;for(b in d)if(a==d[b])return f[o]}else{var v=convert_number(i[4]),m=convert_number(i[5]);if(("["===i[3]?a>=v:a>v)&&("]"===i[6]?a<=m:a<m))return f[o]}return _standardRules[plural_position(a,s)]||_standardRules[0]||void 0}function convert_number(e){return"-Inf"===e?Number.NEGATIVE_INFINITY:"+Inf"===e||"Inf"===e?Number.POSITIVE_INFINITY:parseInt(e,10)}function plural_position(e,a){var s=a;switch("pt_BR"===s&&(s="xbr"),s.length>3&&(s=s.split("_")[0]),s){case"bo":case"dz":case"id":case"ja":case"jv":case"ka":case"km":case"kn":case"ko":case"ms":case"th":case"tr":case"vi":case"zh":return 0;case"af":case"az":case"bn":case"bg":case"ca":case"da":case"de":case"el":case"en":case"eo":case"es":case"et":case"eu":case"fa":case"fi":case"fo":case"fur":case"fy":case"gl":case"gu":case"ha":case"he":case"hu":case"is":case"it":case"ku":case"lb":case"ml":case"mn":case"mr":case"nah":case"nb":case"ne":case"nl":case"nn":case"no":case"om":case"or":case"pa":case"pap":case"ps":case"pt":case"so":case"sq":case"sv":case"sw":case"ta":case"te":case"tk":case"ur":case"zu":return 1==e?0:1;case"am":case"bh":case"fil":case"fr":case"gun":case"hi":case"ln":case"mg":case"nso":case"xbr":case"ti":case"wa":return 0===e||1==e?0:1;case"be":case"bs":case"hr":case"ru":case"sr":case"uk":return e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2;case"cs":case"sk":return 1==e?0:e>=2&&e<=4?1:2;case"ga":return 1==e?0:2==e?1:2;case"lt":return e%10==1&&e%100!=11?0:e%10>=2&&(e%100<10||e%100>=20)?1:2;case"sl":return e%100==1?0:e%100==2?1:e%100==3||e%100==4?2:3;case"mk":return e%10==1?0:1;case"mt":return 1==e?0:0===e||e%100>1&&e%100<11?1:e%100>10&&e%100<20?2:3;case"lv":return 0===e?0:e%10==1&&e%100!=11?1:2;case"pl":return 1==e?0:e%10>=2&&e%10<=4&&(e%100<12||e%100>14)?1:2;case"cy":return 1==e?0:2==e?1:8==e||11==e?2:3;case"ro":return 1==e?0:0===e||e%100>0&&e%100<20?1:2;case"ar":return 0===e?0:1==e?1:2==e?2:e>=3&&e<=10?3:e>=11&&e<=99?4:5;default:return 0}}Object.defineProperty(a,"__esModule",{value:!0});var r=new RegExp(/^\w+\: +(.+)$/),c=new RegExp(/^\s*((\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]]))\s?(.+?)$/),t=new RegExp(/^\s*(\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]])/),n="|";a.default=function(e,a){var s=a.number?a.number:0,r=a.translationsObject?a.translationsObject:{};console.log(a);var c=e;if(void 0!==r&&void 0!==r[e]){c=r[e];var t=pluralize(c,s),n=t.match(/(%([^%]|%%)*%)/g);n&&n.forEach(function(e){var s=e.replace(/[%]+/g,""),r=new RegExp(e,"g");t=t.replace(r,a[s]),console.log(s,e,t)}),c=t}return c}}])});