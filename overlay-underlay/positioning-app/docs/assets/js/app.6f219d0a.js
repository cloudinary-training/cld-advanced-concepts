(function(t){function e(e){for(var o,a,i=e[0],l=e[1],u=e[2],c=0,d=[];c<i.length;c++)a=i[c],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&d.push(n[a][0]),n[a]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);p&&p(e);while(d.length)d.shift()();return s.push.apply(s,u||[]),r()}function r(){for(var t,e=0;e<s.length;e++){for(var r=s[e],o=!0,i=1;i<r.length;i++){var l=r[i];0!==n[l]&&(o=!1)}o&&(s.splice(e--,1),t=a(a.s=r[0]))}return t}var o={},n={app:0},s=[];function a(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=o,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(r,o,function(e){return t[e]}.bind(null,o));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var p=l;s.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"034f":function(t,e,r){"use strict";var o=r("85ec"),n=r.n(o);n.a},"56d7":function(t,e,r){"use strict";r.r(e);var o=r("a026"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("h1",[t._v("Positioning with Gravity")]),r("div",{directives:[{name:"show",rawName:"v-show",value:t.url,expression:"url"}],attrs:{id:"transform"}},[r("img",{attrs:{src:t.url,alt:"positioning example"}})]),r("b-form",{staticClass:"form-inline",on:{submit:t.updateImage}},[r("label",{staticClass:"sr-only",attrs:{for:"gravity"}},[t._v("Gravity:")]),r("b-form-select",{attrs:{id:"gravity",options:t.compass,required:""},model:{value:t.gravity,callback:function(e){t.gravity=e},expression:"gravity"}}),r("label",{attrs:{for:"xpos"}},[t._v("x:")]),r("b-form-input",{attrs:{type:"number",min:"-150",max:"150",step:"10",id:"xpos",placeholder:"X position"},model:{value:t.xpos,callback:function(e){t.xpos=e},expression:"xpos"}}),r("label",{staticClass:"mr-sm-2",attrs:{for:"ypos"}},[t._v("y:")]),r("b-form-input",{attrs:{type:"number",min:"-150",max:"150",step:"10",id:"ypos",placeholder:"Y position"},model:{value:t.ypos,callback:function(e){t.ypos=e},expression:"ypos"}}),r("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("Submit")])],1),r("div",{staticClass:"parent"},[r("div",{directives:[{name:"show",rawName:"v-show",value:t.url,expression:"url"}],staticClass:"url-display"},[r("a",{attrs:{href:t.url,target:"_blank"}},[t._v(t._s(t.url))])])])],1)},s=[],a=r("194e"),i=r.n(a),l={name:"App",created:function(){this.cld=i.a.Cloudinary.new({cloud_name:"sep-2020-test"}),this.url=this.createUrl()},methods:{onSubmit(t){t.preventDefault(),alert(JSON.stringify(this.form))},createUrl(){const t=i.a.Transformation.new();return t.width(250).crop("scale").effect("replace_color:red").border("5px_solid_red").chain().overlay("logo").width("50").crop("fit").gravity(this.gravity).x(this.xpos).y(this.ypos),console.log(this.cld.url(this.publicId,t)),this.cld.url(this.publicId,t)},updateImage(t){console.log("hi"),t.preventDefault(),this.url=this.createUrl(),console.log(this.url),console.log(`image update:  ${this.gravity} `),console.log(`image update:  ${this.xpos} `),console.log(`image update:  ${this.ypos} `)}},data:function(){return{publicId:"1px",url:null,gravity:"center",cld:void 0,xpos:0,ypos:0,compass:["center","north","north_east","east","south_east","south","south_west","west","north_west"]}}},u=l,p=(r("034f"),r("2877")),c=Object(p["a"])(u,n,s,!1,null,null,null),d=c.exports,f=r("5f5b"),h=r("b1e0");o["default"].use(f["a"]),o["default"].use(h["a"]),o["default"].config.productionTip=!1,new o["default"]({render:t=>t(d)}).$mount("#app")},"85ec":function(t,e,r){}});
//# sourceMappingURL=app.6f219d0a.js.map