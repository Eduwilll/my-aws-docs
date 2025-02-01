import{r as d}from"./index.BL7xzsR_.js";var l={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c;function E(){if(c)return a;c=1;var n=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function o(s,r,e){var u=null;if(e!==void 0&&(u=""+e),r.key!==void 0&&(u=""+r.key),"key"in r){e={};for(var i in r)i!=="key"&&(e[i]=r[i])}else e=r;return r=e.ref,{$$typeof:n,type:s,key:u,ref:r!==void 0?r:null,props:e}}return a.Fragment=t,a.jsx=o,a.jsxs=o,a}var x;function v(){return x||(x=1,l.exports=E()),l.exports}var C=v();/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),f=(...n)=>n.filter((t,o,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===o).join(" ").trim();/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=d.forwardRef(({color:n="currentColor",size:t=24,strokeWidth:o=2,absoluteStrokeWidth:s,className:r="",children:e,iconNode:u,...i},m)=>d.createElement("svg",{ref:m,...w,width:t,height:t,stroke:n,strokeWidth:s?Number(o)*24/Number(t):o,className:f("lucide",r),...i},[...u.map(([p,R])=>d.createElement(p,R)),...Array.isArray(e)?e:[e]]));/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=(n,t)=>{const o=d.forwardRef(({className:s,...r},e)=>d.createElement(h,{ref:e,iconNode:t,className:f(`lucide-${k(n)}`,s),...r}));return o.displayName=`${n}`,o};export{A as c,C as j};
