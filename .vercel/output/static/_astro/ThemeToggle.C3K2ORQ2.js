import{c as l,j as a}from"./createLucideIcon.D_iQW354.js";import{r as o}from"./index.BL7xzsR_.js";/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],h=l("Moon",m);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],i=l("Sun",d),p=()=>{const[e,c]=o.useState("light"),[s,n]=o.useState(!1);o.useEffect(()=>{const t=localStorage.getItem("theme");c(t||"light"),n(!0)},[]),o.useEffect(()=>{if(s){const t=document.documentElement;e==="dark"?(t.classList.add("dark"),localStorage.setItem("theme","dark")):(t.classList.remove("dark"),localStorage.setItem("theme","light"))}},[e,s]);const r=()=>{c(e==="light"?"dark":"light")};return s?a.jsx("button",{onClick:r,className:"p-2 rounded-full text-primary transition-colors","aria-label":"Toggle Theme",children:e==="light"?a.jsx(h,{}):a.jsx(i,{})}):null};export{p as default};
