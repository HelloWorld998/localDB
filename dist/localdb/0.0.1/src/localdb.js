define("localdb/0.0.1/src/localdb",[],function(e,t,r){"use strict";var n,i,s,o;s=e("localdb/0.0.1/src/lib/utils"),n=e("localdb/0.0.1/src/lib/collection"),o="ldb_",i=function(){function e(e,t){if(null==t&&(t={}),void 0===e)throw new Error("dbName should be specified.");this.name=o+e,this.ls=t.engine||localStorage}return e.prototype.options=function(){return{name:this.name.substr(o.length),engine:this.ls}},e.prototype.collections=function(){var e,t,r,n;for(n=[],e=t=0,r=this.ls.length;r>=0?r>t:t>r;e=r>=0?++t:--t)0===this.ls.key(e).indexOf(""+this.name+"_")&&n.push(this.ls.key(e).substr((""+this.name+"_").length));return n},e.prototype.collection=function(e){return new n(e,this)},e.prototype.drop=function(e){var t,r,n,i,s;for(e=null!=e?"_"+e:"",n=function(){var r,n,i;for(i=[],t=r=0,n=this.ls.length;n>=0?n>r:r>n;t=n>=0?++r:--r)0===this.ls.key(t).indexOf(this.name+e)&&i.push(this.ls.key(t));return i}.call(this),i=0,s=n.length;s>i;i++)r=n[i],this.ls.removeItem(r);return!0},e}(),i.support=function(){return{localStorage:"undefined"!=typeof localStorage&&null!==localStorage?!0:!1,sessionStorage:"undefined"!=typeof sessionStorage&&null!==sessionStorage?!0:!1,indexedDB:!1}},i.getTimestamp=function(e){return s.getTimestamp(e)},i.getTime=function(e){return s.getTime(e)},("undefined"==typeof seajs||null===seajs)&&(window.LocalDB=i),r.exports=i}),define("localdb/0.0.1/src/lib/utils",[],function(require,exports,module){"use strict";var ObjectID,Utils,eq,toString,_isType;ObjectID=require("localdb/0.0.1/src/lib/bson"),Utils={},toString=Object.prototype.toString,_isType=function(e){return function(t){return toString.call(t).toLowerCase()===("[object "+e+"]").toLowerCase()}},Utils.isType=function(e,t){return _isType(t)(e)},Utils.isObject=_isType("object"),Utils.isString=_isType("string"),Utils.isNumber=_isType("number"),Utils.isArray=_isType("array"),Utils.isFunction=_isType("function"),Utils.isRegex=_isType("regexp"),Utils.keys=function(e){return Utils.isObject(e)?Object.keys?Object.keys(e):void 0:[]},Utils.has=function(e,t){return null!==e&&void 0!==e&&Object.prototype.hasOwnProperty.call(e,t)},eq=function(e,t,r,n){var i,s,o,u,l,a,f,c,h;if(e===t)return 0!==e||1/e===1/t;if(null===e&&void 0===t)return!1;if(void 0===e&&null===t)return!1;if(u=toString.call(e),u!==toString.call(t))return!1;switch(u){case"[object RegExp]":return""+e==""+t;case"[object String]":return""+e==""+t;case"[object Number]":return+e!==+e?+t!==+t:0===+e?1/+e===1/t:+e===+t;case"[object Date]":return+e===+t;case"[object Boolean]":return+e===+t}if(s="[object Array]"===u,!s){if("object"!=typeof e||"object"!=typeof t)return!1;if(i=e.constructor,o=t.constructor,i!==o&&!(Utils.isFunction(i)&&i instanceof i&&Utils.isFunction(o)&&o instanceof o)&&"constructor"in e&&"constructor"in t)return!1}for(f=r.length;f--;)if(r[f]===e)return n[f]===t;if(r.push(e),n.push(t),s){if(h=e.length,c=h===t.length)for(;h--&&(c=eq(e[h],t[h],r,n)););}else if(a=Utils.keys(e),h=a.length,c=Utils.keys(t).length===h)for(;h--&&(l=a[h],c=Utils.has(t,l)&&eq(e[l],t[l],r,n)););return r.pop(),n.pop(),c},Utils.isEqual=function(e,t){return eq(e,t,[],[])},Utils.createObjectId=function(){return(new ObjectID).inspect()},Utils.stringify=function(e){return null!=e&&Utils.isArray(e)?JSON.stringify(e,function(e,t){return Utils.isRegex(t)||Utils.isFunction(t)?t.toString():t}):"[]"},Utils.parse=function(str){return null!=str&&Utils.isString(str)?JSON.parse(str,function(key,value){var v;try{v=eval(value)}catch(_error){}if(null!=v&&Utils.isRegex(v))return v;try{v=eval("("+value+")")}catch(_error){}return null!=v&&Utils.isFunction(v)?v:value}):[]},Utils.getTimestamp=function(e){return new ObjectID(e).getTimestamp()},Utils.getTime=function(e){return new ObjectID(e).getTime()},module.exports=Utils}),define("localdb/0.0.1/src/lib/bson",[],function(e,t,r){"use strict";var n,i,s,o,u,l;n=e("localdb/0.0.1/src/lib/binary-parser"),u=function(){var e,t;for(t=[],l=e=0;256>e;l=++e)t.push((15>=l?"0":"")+l.toString(16));return t}(),i=parseInt(16777215*Math.random(),10),o=/^[0-9a-fA-F]{24}$/,s=function(e){if(this._bsontype="ObjectID",null!=e&&12!==e.length&&24!==e.length)throw new Error("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");if(null==e)return this.id=this.generate();if(null!=e&&12===e.length)return this.id=e;if(o.test(e))return s.createFromHexString(e);throw new Error("Value passed in is not a valid 24 character hex string")},s.prototype.generate=function(){var e,t,r,s,o;return o=parseInt(Date.now()/1e3,10),s=n.encodeInt(o,32,!0,!0),t=n.encodeInt(i,24,!1),r=n.fromShort("undefined"==typeof process?Math.floor(1e5*Math.random()):process.pid),e=n.encodeInt(this.get_inc(),24,!1,!0),s+t+r+e},s.prototype.toHexString=function(){var e,t,r;for(e="",l=t=0,r=this.id.length;r>=0?r>t:t>r;l=r>=0?++t:--t)e+=u[this.id.charCodeAt(l)];return e},s.prototype.toString=function(){return this.toHexString()},s.prototype.inspect=s.prototype.toString,s.prototype.getTime=function(){return 1e3*Math.floor(n.decodeInt(this.id.substring(0,4),32,!0,!0))},s.prototype.getTimestamp=function(){var e;return e=new Date,e.setTime(this.getTime()),e},s.prototype.get_inc=function(){return s.index=(s.index+1)%16777215},s.index=parseInt(16777215*Math.random(),10),s.createFromHexString=function(e){var t,r;for(t="",l=r=0;24>r;l=++r)l%2===0&&(t+=n.fromByte(parseInt(e.substr(l,2),16)));return new s(t,e)},r.exports=s}),define("localdb/0.0.1/src/lib/binary-parser",[],function(e,t,r){function n(e,t){return this instanceof n?(this.bigEndian=e,void(this.allowExceptions=t)):new n(e,t)}function i(e,t){this.bigEndian=e||0,this.buffer=[],this.setBuffer(t)}for(var s=(String.fromCharCode,[]),o=0;64>o;o++)s[o]=Math.pow(2,o);n.warn=function(e){if(this.allowExceptions)throw new Error(e);return 1},n.decodeInt=function(e,t,r,n){var i=new this.Buffer(this.bigEndian||n,e),o=i.readBits(0,t),u=s[t];return r&&o>=u/2?o-u:o},n.encodeInt=function(e,t,r,n){var i=s[t];(e>=i||-(i/2)>e)&&(this.warn("encodeInt::overflow"),e=0),0>e&&(e+=i);for(var o=[];e;o[o.length]=String.fromCharCode(e%256),e=Math.floor(e/256));for(t=-(-t>>3)-o.length;t--;o[o.length]="\x00");return(this.bigEndian||n?o.reverse():o).join("")},n.fromByte=function(e){return this.encodeInt(e,8,!1)},n.fromShort=function(e){return this.encodeInt(e,16,!0)},i.prototype.setBuffer=function(e){var t,r,n;if(e){for(r=t=e.length,n=this.buffer=new Array(t);r;n[t-r]=e.charCodeAt(--r));this.bigEndian&&n.reverse()}},i.prototype.hasNeededBits=function(e){return this.buffer.length>=-(-e>>3)},i.prototype.checkBuffer=function(e){if(!this.hasNeededBits(e))throw new Error("checkBuffer::missing bytes")},i.prototype.readBits=function(e,t){function r(e,t){for(;t--;e=1073741824==(1073741824&(e%=2147483648))?2*e:2*(e-1073741824)+2147483647+1);return e}if(0>e||0>=t)return 0;this.checkBuffer(e+t);for(var n,i=e%8,s=this.buffer.length-(e>>3)-1,o=this.buffer.length+(-(e+t)>>3),u=s-o,l=(this.buffer[s]>>i&(1<<(u?8-i:t))-1)+(u&&(n=(e+t)%8)?(this.buffer[o++]&(1<<n)-1)<<(u--<<3)-i:0);u;l+=r(this.buffer[o++],(u--<<3)-i));return l},n.Buffer=i,r.exports=n}),define("localdb/0.0.1/src/lib/collection",[],function(e,t,r){"use strict";var n,i,s;s=e("localdb/0.0.1/src/lib/utils"),i=e("localdb/0.0.1/src/lib/operation"),n=function(){function e(e,t){if(void 0===e)throw new Error("collectionName should be specified.");this.name=""+t.name+"_"+e,this.ls=t.ls,this.deserialize()}return e.prototype.deserialize=function(){return this.data=s.parse(this.ls.getItem(this.name))},e.prototype.serialize=function(){return this.ls.setItem(this.name,s.stringify(this.data))},e.prototype.drop=function(){return this.ls.removeItem(this.name),!0},e.prototype.insert=function(e,t){return null==t&&(t={}),this.deserialize(),this.data=i.insert(this.data,e,t),this.serialize()},e.prototype.update=function(e,t){return null==t&&(t={}),this.deserialize(),this.data=i.update(this.data,e,t),this.serialize()},e.prototype.remove=function(e){return null==e&&(e={}),this.deserialize(),this.data=i.remove(this.data,e),this.serialize()},e.prototype.find=function(e){return null==e&&(e={}),this.deserialize(),i.find(this.data,e)},e.prototype.findOne=function(e){var t;return null==e&&(e={}),e.limit=1,t=i.find(this.data,e)[0],null!=t?t:{}},e}(),r.exports=n}),define("localdb/0.0.1/src/lib/operation",[],function(e,t,r){"use strict";var n,i,s,o,u;u=e("localdb/0.0.1/src/lib/where"),o=e("localdb/0.0.1/src/lib/utils"),i=e("localdb/0.0.1/src/lib/projection"),n={},n.insert=function(e,t){var r,n,i;if(o.isArray(t))for(n=0,i=t.length;i>n;n++)r=t[n],o.isObject(r)&&(null==r._id&&(r._id=o.createObjectId()),e.push(r));else o.isObject(t)&&(null==t._id&&(t._id=o.createObjectId()),e.push(t));return e},n.update=function(e,t,r){var n,i,o,u,l;l=r.where||{},i=null!=r.multi?r.multi:!0,o=null!=r.upsert?r.upsert:!1;for(n in t)u=t[n],e=s.generate(e,n,u,l,i,o);return e},n.remove=function(e,t){var r,n,i,s,o,l,a;for(o=t.where||{},i=null!=t.multi?t.multi:!0,s=[],n=!1,l=0,a=e.length;a>l;l++)r=e[l],n?s.push(r):u(r,o)?i||(n=!0):s.push(r);return s},n.find=function(e,t){var r,n,s,o,l,a,f;for(l=t.where||{},s=t.projection||{},n=t.limit||-1,o=[],a=0,f=e.length;f>a;a++)if(r=e[a],u(r,l)){if(0===n)break;n-=1,o.push(r)}return i.generate(o,s)},s={isKeyReserved:function(e){return"$inc"===e||"$set"===e||"$mul"===e||"$rename"===e||"$unset"===e||"$max"===e||"$min"===e},generate:function(e,t,r,n,i,o){var l,a,f,c,h,d,p;if(!s.isKeyReserved(t))return e;for(c in r)for(h=r[c],d=0,p=e.length;p>d;d++)if(l=e[d],u(l,n)){for(f=!1;c.indexOf(".")>0;){if(a=c.split(".")[0],l=l[a],null==l&&!o){f=!0;break}o&&(l=l||{}),c=c.substr(c.indexOf(".")+1)}if(!f){switch(t){case"$inc":(null!=l[c]||o)&&(l[c]+=h);break;case"$set":(null!=l[c]||o)&&(l[c]=h);break;case"$mul":(null!=l[c]||o)&&(l[c]*=h);break;case"$rename":l[h]=l[c],delete l[c];break;case"$unset":delete l[c];break;case"$min":(null!=l[c]||o)&&(l[c]=Math.min(l[c],h));break;case"$max":(null!=l[c]||o)&&(l[c]=Math.max(l[c],h))}if(!i)break}}return e}},r.exports=n}),define("localdb/0.0.1/src/lib/where",[],function(e,t,r){"use strict";var n,i,s,o,u,l,a,f,c,h,d,p,b=[].indexOf||function(e){for(var t=0,r=this.length;r>t;t++)if(t in this&&this[t]===e)return t;return-1};n=e("localdb/0.0.1/src/lib/utils"),h=["$gt","$gte","$lt","$lte","$ne","$in","$nin","$and","$nor","$or","$not","$exists","$type","$mod","$regex","$all","$elemMatch","$size"],u=function(e){return b.call(h,e)>=0},i=function(e,t){var r,n;for(n in t){if(r=t[n],null==e){if("$exists"===n&&r===!1)continue;return!1}if(-1!==n.indexOf(".")){if(o(e,n,r))continue;return!1}if(!p(e,n,r))return!1;if(!l(e,n,r))return!1}return!0},o=function(e,t,r){var n;return n=t.split(".")[0],i(e[/\d/.test(n)?Number(n):n],new function(){this[t.substr(t.indexOf(".")+1)]=r})},p=function(e,t,r){var i;return u(t)?!0:(i=e[t],n.isNumber(r)&&!a(i,r)?!1:n.isString(r)&&!d(i,r)?!1:n.isRegex(r)&&!c(i,r)?!1:n.isArray(r)&&!s(i,r)?!1:n.isObject(r)&&!f(i,r)?!1:!0)},l=function(e,t,r){var s,o,u,a,f,c,h,d,p,g,y;switch(t){case"$gt":if(r>=e)return!1;break;case"$gte":if(r>e)return!1;break;case"$lt":if(e>=r)return!1;break;case"$lte":if(e>r)return!1;break;case"$ne":if(e===r)return!1;break;case"$in":if(n.isArray(e)){for(u=!0,a=0,d=e.length;d>a;a++)o=e[a],u&&function(){var e,t,i;for(t=0,i=r.length;i>t;t++)if(e=r[t],n.isRegex(e)&&e.test(o)||n.isEqual(e,o))return!0;return!1}()&&(u=!1);if(u)return!1}else if(!function(){var t,i,s;for(i=0,s=r.length;s>i;i++)if(t=r[i],n.isRegex(t)&&t.test(e)||n.isEqual(t,e))return!0;return!1}())return!1;break;case"$nin":if(b.call(r,e)>=0)return!1;break;case"$exists":if(r!==(null!=e))return!1;break;case"$type":if(!n.isType(e,r))return!1;break;case"$mod":if(e%r[0]!==r[1])return!1;break;case"$regex":if(!new RegExp(r).test(e))return!1;break;case"$and":for(f=0,p=r.length;p>f;f++)if(s=r[f],!i(e,s))return!1;break;case"$nor":for(c=0,g=r.length;g>c;c++)if(s=r[c],i(e,s))return!1;break;case"$or":if(!function(){var t,n;for(t=0,n=r.length;n>t;t++)if(s=r[t],i(e,s))return!0;return!1}())return!1;break;case"$not":if(i(e,r))return!1;break;case"$all":if(!n.isArray(e))return!1;for(h=0,y=r.length;y>h;h++)if(s=r[h],!function(){var r,i;for(i=0,r=e.length;r>i;i++)if(o=e[i],n.isArray(s)?l(o,t,s):o===s)return!0}())return!1;break;case"$elemMatch":if(!n.isArray(e))return!1;if(!function(){var t,n;for(n=0,t=e.length;t>n;n++)if(o=e[n],i(o,r))return!0}())return!1;break;case"$size":if(!n.isArray(e))return!1;if(e.length!==r)return!1}return!0},a=function(e,t){return n.isNumber(e)&&t===e?!0:n.isArray(e)&&b.call(e,t)>=0?!0:!1},d=function(e,t){return n.isString(e)&&t===e?!0:n.isArray(e)&&b.call(e,t)>=0?!0:!1},c=function(e,t){var r,i,s;if(n.isArray(e)){for(i=0,s=e.length;s>i;i++)if(r=e[i],n.isRegex(r)){if(n.isEqual(r,t))return!0}else if(t.test(r))return!0}else if(n.isRegex(e)){if(n.isEqual(e,t))return!0}else if(t.test(e))return!0;return!1},s=function(e,t){return n.isEqual(e,t)},f=function(e,t){var r,s,o;s=!0;for(o in t)if(r=t[o],u(o)&&(s=!1,!i(e,new function(){this[o]=r})))return!1;return s?n.isEqual(e,t):!0},r.exports=i}),define("localdb/0.0.1/src/lib/projection",[],function(e,t,r){"use strict";var n,i,s;i=e("localdb/0.0.1/src/lib/utils"),n={},n.generate=function(e,t){var r,n,o,u,l;if("{}"===JSON.stringify(t))return e;for(o=[],u=0,l=e.length;l>u;u++)r=e[u],n=s(r,t),i.isEqual(n,{})||o.push(n);return o},s=function(e,t){var r,n,o,u,l,a,f,c,h,d,p,b;f={},u=!0;for(l in t)if(d=t[l],"_id"!==l||-1!==d)if(-1!==l.indexOf(".$")){if(l=l.split(".")[0],!i.isArray(e[l])||0===e[l].length)continue;f[l]=[e[l][0]]}else{if(0===l.indexOf("$elemMatch")){if(!i.isArray(e)||0===e.length)return[];for(a=[],p=0,b=e.length;b>p;p++){o=e[p],r=!0;for(c in d)h=d[c],i.isObject(h)||o[c]!==h&&(r=!1);if(r){a.push(o);break}}return i.isEqual(a,[])?[]:a}i.isObject(d)?(n=s(e[l],d),i.isEqual(n,[])||(f[l]=n)):1===d&&(f[l]=e[l])}else u=!1;return u&&!i.isEqual(f,{})&&(f._id=e._id),f},r.exports=n});