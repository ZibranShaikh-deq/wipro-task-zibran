(this["webpackJsonpsearch-is-in-our-dna"]=this["webpackJsonpsearch-is-in-our-dna"]||[]).push([[0],{22:function(e,n,t){e.exports=t(38)},27:function(e,n,t){},30:function(e,n,t){},34:function(e,n,t){},36:function(e,n,t){},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(6),o=t.n(c),l=t(5),u=t(41),i=(t(27),function(){return r.a.createElement(u.a,{bg:"light",expand:"lg",className:"header"},r.a.createElement(u.a.Brand,{href:"/home"},"Search is in our DNA"))}),s=(t(30),function(e){return r.a.createElement("footer",{className:"app-footer"},r.a.createElement("div",null,r.a.createElement("span",null,"ABC"),r.a.createElement("span",null,"\xa9 2020 ABC.")),r.a.createElement("div",{className:"ml-auto"},r.a.createElement("span",null,"Powered by ABC")))}),f=function(e){var n=Object(a.useState)(window.scrollY>30),t=Object(l.a)(n,2),c=t[0],o=t[1];Object(a.useEffect)((function(){return document.addEventListener("scroll",u),function(){document.removeEventListener("scroll",u)}}),[]);var u=function(){var e=window.scrollY;o(e>30)};return r.a.createElement(a.Fragment,null,r.a.createElement(i,{class:"pt-10",showBackground:c}),r.a.createElement(a.Fragment,null,e.children),r.a.createElement(s,null))},m=t(12),E=t.n(m),p=t(17),d=t(42),h={SEARCH:"Search",PLACEHOLDER:"Enter text for search",ERROR_MESSAGE:"Something Went Wrong"},v=function(e){return e>1e3&&(e=1e3),Math.floor(1e3*Math.random())%e===0},b=function(e){var n=[];return v(2)&&n.push("pre"+e),v(2)&&n.push(e),v(2)&&n.push(e+"post"),v(2)&&n.push("pre"+e+"post"),new Promise((function(e,t){var a=200*Math.random();setTimeout((function(){v(10)?t():e(n)}),a)}))},g=t(18),O=(t(34),function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),u=Object(l.a)(o,2),i=u[0],s=u[1],f=Object(a.useState)(!1),m=Object(l.a)(f,2),v=m[0],O=m[1],w=Object(a.useState)(null),S=Object(l.a)(w,2),j=S[0],C=S[1],k=Object(a.useRef)(),L=Object(a.useRef)(),R=function(e){L.current.contains(e.target)||O(!1)};Object(a.useEffect)((function(){return document.addEventListener("mousedown",R),function(){document.removeEventListener("mousedown",R)}}),[]);var A=i.split(" "),D=A[A.length-1],N=function(){var e=Object(p.a)(E.a.mark((function e(n){var t,a,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=n.split(" "))){e.next=6;break}return e.next=4,b(t[t.length-1]);case 4:(a=e.sent)&&a.length>0&&(r=a.filter((function(e){return""!==e})),c(r),O(!0),C(null));case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),_=Object(a.useCallback)(Object(g.debounce)(N,500),[]),y=function(e){e.preventDefault();var n=e.target.value;s(n);var t=n.split(" ");D!==t[t.length-1]?_(n):O(!1)},B=function(e){var n=i.split(" ");if(n||e){n[n.length-1]=e;var t=n.toString().replace(/,/g," ");O(!1),s(t+" "),C(null),k.current.focus()}},x=function(e){var n=null===j?0:j;switch(e.keyCode){case 38:-1!==n&&(--n,C(n));break;case 40:n<t.length-1&&(n=null===j?n:++n,C(n));break;case 13:e.preventDefault(),null!==j&&B(t[j]);break;default:return}};return r.a.createElement("div",{className:"parent-container"},r.a.createElement(d.a,null,r.a.createElement(d.a.Group,null,r.a.createElement(d.a.Label,null,h.SEARCH),r.a.createElement("div",{ref:L},r.a.createElement(d.a.Control,{ref:k,type:"text",autoComplete:"off",placeholder:h.PLACEHOLDER,onChange:y,value:i,onFocus:function(){return!j&&!i&&N("")},onKeyDown:x}),v&&t&&t.length>0?r.a.createElement("div",{className:"option-div"},t.map((function(e,n){return e?r.a.createElement("option",{key:e,className:"option ".concat(e===D?"highlight-color":""," \n                    ").concat(j===n?"active-option":""),onClick:function(){return B(e)}},e):null}))):null))))}),w=(t(36),function(){return r.a.createElement(f,null,r.a.createElement(O,null))}),S=function(){return console.log("process.env",Object({NODE_ENV:"production",PUBLIC_URL:"/wipro-task-zibran",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0})),r.a.createElement(a.Fragment,null,r.a.createElement(w,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var j=t(19);Object(j.a)(),t(37);o.a.render(r.a.createElement(a.Suspense,{fallback:"Loading..."},r.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[22,1,2]]]);
//# sourceMappingURL=main.c8b99d49.chunk.js.map