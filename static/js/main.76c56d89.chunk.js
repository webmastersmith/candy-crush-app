(this["webpackJsonpcandy-crush"]=this["webpackJsonpcandy-crush"]||[]).push([[0],{20:function(t,r,e){},24:function(t,r,e){"use strict";e.r(r);var n=e(0),c=e.n(n),a=e(11),o=e.n(a),i=(e(20),e(7)),u=e(4),s=e(3),f=e(12),d=e.p+"static/media/blank.fbcb9179.png",l=[e.p+"static/media/blue-candy.73120c15.png",e.p+"static/media/green-candy.599f7016.png",e.p+"static/media/orange-candy.f106b2cd.png",e.p+"static/media/purple-candy.ae25b8a5.png",e.p+"static/media/red-candy.3658b37c.png",e.p+"static/media/yellow-candy.a3d87a9b.png"],p=function(t){return t[Math.floor(Math.random()*t.length)]},h=function(t){for(var r=t.colorArray,e=t.isMatch,n=t.setScore,c=function(t){var c=[t,t+8,t+16,t+24],a=c.every((function(e){return r[e]===r[t]})),o=r[t]===d;a&&!o&&(c.forEach((function(t){return r[t]=d})),e=!0,n((function(t){return t+4})))},a=0;a<=39;a++)c(a);return{colorArray:r,isMatch:e,setScore:n}},b=function(t){for(var r=t.colorArray,e=t.isMatch,n=t.setScore,c=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,61,62,63],a=function(t){if(!c.includes(t)){var a=[t,t+1,t+2,t+3],o=a.every((function(e){return r[e]===r[t]})),i=r[t]===d;o&&!i&&(a.forEach((function(t){return r[t]=d})),e=!0,n((function(t){return t+4})))}},o=0;o<r.length;o++)a(o);return{colorArray:r,isMatch:e,setScore:n}},g=function(t){for(var r=t.colorArray,e=t.isMatch,n=t.setScore,c=function(t){var c=[t,t+8,t+16],a=c.every((function(e){return r[e]===r[t]})),o=r[t]===d;a&&!o&&(c.forEach((function(t){return r[t]=d})),e=!0,n((function(t){return t+3})))},a=0;a<=47;a++)c(a);return{colorArray:r,isMatch:e,setScore:n}},y=function(t){for(var r=t.colorArray,e=t.isMatch,n=t.setScore,c=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63],a=function(t){if(!c.includes(t)){var a=[t,t+1,t+2],o=a.every((function(e){return r[e]===r[t]})),i=r[t]===d;o&&!i&&(a.forEach((function(t){return r[t]=d})),e=!0,n((function(t){return t+3})))}},o=0;o<r.length;o++)a(o);return{colorArray:r,isMatch:e,setScore:n}},v=function(t){for(var r=t.colorArray,e=(t.isMatch,t.setScore,0);e<=55;e++){[0,1,2,3,4,5,6,7].includes(e)&&r[e]===d&&(r[e]=p(l)),r[e+8]===d&&(r[e+8]=r[e],r[e]=d)}return r},j=e(1);function m(){var t=Object(n.useState)([]),r=Object(u.a)(t,2),e=r[0],c=r[1],a=Object(n.useState)(null),o=Object(u.a)(a,2),s=o[0],d=o[1],m=Object(n.useState)(null),x=Object(u.a)(m,2),w=x[0],D=x[1],E=Object(n.useState)(0),I=Object(u.a)(E,2),_=I[0],C=I[1];Object(n.useEffect)((function(){c(function(){for(var t=[],r=0;r<64;r++)t.push(p(l));return t}())}),[]);var k=function(t){return d(t.target)},N=function(t){return D(t.target)},J=function(t){var r=Object(i.a)(e),n=parseInt(s.getAttribute("data-id")),a=parseInt(w.getAttribute("data-id"));r[a]=s.getAttribute("src"),r[n]=w.getAttribute("src");var o=[n-1,n+1,n-8,n+8].includes(a),u=h({colorArray:r,isMatch:!1,setScore:C}).isMatch,f=b({colorArray:r,isMatch:!1,setScore:C}).isMatch,d=g({colorArray:r,isMatch:!1,setScore:C}).isMatch,l=y({colorArray:r,isMatch:!1,setScore:C}).isMatch;o&&(u||f||d||l)&&c(Object(i.a)(r))},B=Object(f.useCallback)((function(){return function(){for(var t=arguments.length,r=new Array(t),e=0;e<t;e++)r[e]=arguments[e];return r.reduce((function(t,r){return function(){return r(t.apply(void 0,arguments))}}))}(h,b,g,y,v)({colorArray:e,isMatch:!1,setScore:C})}),[e]);return Object(n.useEffect)((function(){var t=setInterval((function(){c(Object(i.a)(B()))}),100);return function(){return clearInterval(t)}}),[B]),Object(j.jsxs)(A,{children:[Object(j.jsxs)(S,{children:["Score: ",_]}),Object(j.jsx)(M,{children:e.map((function(t,r){return Object(j.jsx)(O,{src:t,alt:r,"data-id":r,onDragStart:k,draggable:!0,onDragOver:function(t){return t.preventDefault()},onDragEnter:function(t){return t.preventDefault()},onDragLeave:function(t){return t.preventDefault()},onDrop:N,onDragEnd:J},r)}))})]})}var A=s.a.div.withConfig({displayName:"App__Wrapper",componentId:"sc-uf3dbf-0"})(["display:flex;flex-direction:column;padding:30px;align-items:center;"]),S=s.a.h1.withConfig({displayName:"App__Score",componentId:"sc-uf3dbf-1"})(["font-weight:bold;"]),M=s.a.div.withConfig({displayName:"App__Game",componentId:"sc-uf3dbf-2"})(["display:flex;flex-wrap:wrap;width:560px;height:560px;"]),O=s.a.img.withConfig({displayName:"App__Tile",componentId:"sc-uf3dbf-3"})(["width:70px;height:70px;"]);o.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(m,{})}),document.getElementById("root"))}},[[24,1,2]]]);
//# sourceMappingURL=main.76c56d89.chunk.js.map