(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6361591f"],{"11e9":function(t,e,n){var s=n("52a7"),a=n("4630"),r=n("6821"),i=n("6a99"),o=n("69a8"),l=n("c69a"),c=Object.getOwnPropertyDescriptor;e.f=n("9e1e")?c:function(t,e){if(t=r(t),e=i(e,!0),l)try{return c(t,e)}catch(n){}if(o(t,e))return a(!s.f.call(t,e),t[e])}},4356:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"profile"},[t.msg?n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12"},[n("div",{staticClass:"coverImg",style:{"background-image":"url("+t.msg.coverPhoto+")"}})]),n("div",{staticClass:"col-md-12 "},[n("div",{staticClass:"userBox  row m-0"},[n("div",{staticClass:"col-lg-3 col-md-2 col-sm-12"},[n("div",{staticClass:"profileUserBox"},[n("img",{attrs:{src:t.msg.avatar,alt:"img"}})])]),n("div",{staticClass:"col-lg-9 col-md-10 d-none d-md-block"},[n("ul",{staticClass:"userList"},[n("li",{staticClass:"hasChild"},[t._m(0),n("ul",{staticClass:"subMenu shadow pt-3 pb-3  rounded"},[n("li",[n("router-link",{attrs:{to:""}},[t._v("Edit")])],1),n("li",[n("router-link",{attrs:{to:""}},[t._v("Subscribe")])],1),n("li",[n("router-link",{attrs:{to:""}},[t._v("Customize")])],1)])]),n("li",[n("router-link",{attrs:{to:{name:"polls"}}},[t._v("Poll")])],1),n("li",[n("router-link",{attrs:{to:{name:"Friends"}}},[t._v("Friends")])],1),n("li",[n("router-link",{attrs:{to:"/photos"}},[t._v("Photos")])],1),n("li",[n("router-link",{attrs:{to:{name:""}}},[t._v("Blog")])],1),n("li",{staticClass:"hasChild"},[t._m(1),n("ul",{staticClass:"subMenu shadow pt-3 pb-3  rounded"},[n("li",[n("router-link",{attrs:{to:""}},[t._v("Ads")])],1),n("li",[n("router-link",{attrs:{to:{name:"events"}}},[t._v("Events")])],1),n("li",[n("router-link",{attrs:{to:{name:"Photos"}}},[t._v("Photos")])],1),n("li",[n("router-link",{attrs:{to:{name:""}}},[t._v("Timeline")])],1),n("li",[n("router-link",{attrs:{to:{name:"videos"}}},[t._v("Videos")])],1),n("li",[n("router-link",{attrs:{to:{name:""}}},[t._v("Classifieds")])],1),n("li",[n("router-link",{attrs:{to:{name:"fundraisers"}}},[t._v("Fund Raisers")])],1),n("li",[n("router-link",{attrs:{to:{name:""}}},[t._v("Sites")])],1),n("li",[n("router-link",{attrs:{to:{name:""}}},[t._v("Store")])],1),n("li",[n("router-link",{attrs:{to:{name:"groups"}}},[t._v("Groups")])],1)])])])])])])])]):t._e()])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",[n("span",{staticClass:"textBox"},[t._v("Profile")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",[n("span",{staticClass:"textBox"},[t._v("Still")])])}],r=(n("2f62"),{data:function(){return{currentUser:null}},props:{msg:Object}}),i=r,o=n("2877"),l=Object(o["a"])(i,s,a,!1,null,null,null);e["a"]=l.exports},"454f":function(t,e,n){n("46a7");var s=n("584a").Object;t.exports=function(t,e,n){return s.defineProperty(t,e,n)}},"456d":function(t,e,n){var s=n("4bf8"),a=n("0d58");n("5eda")("keys",(function(){return function(t){return a(s(t))}}))},"46a7":function(t,e,n){var s=n("63b6");s(s.S+s.F*!n("8e60"),"Object",{defineProperty:n("d9f6").f})},"5eda":function(t,e,n){var s=n("5ca1"),a=n("8378"),r=n("79e5");t.exports=function(t,e){var n=(a.Object||{})[t]||Object[t],i={};i[t]=e(n),s(s.S+s.F*r((function(){n(1)})),"Object",i)}},"7a49":function(t,e,n){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=n("85f2"),r=n.n(a);function i(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),r()(t,s.key,s)}}function o(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}n.d(e,"a",(function(){return l}));var l=function(){function t(){s(this,t)}return o(t,[{key:"getToken",value:function(){var t=JSON.parse(localStorage.getItem("user")),e=t.token;return"Bearer ".concat(e)}},{key:"getId",value:function(){var t=JSON.parse(localStorage.getItem("user"));return t.id}}]),t}()},"85f2":function(t,e,n){t.exports=n("454f")},"8e6e":function(t,e,n){var s=n("5ca1"),a=n("990b"),r=n("6821"),i=n("11e9"),o=n("f1ae");s(s.S,"Object",{getOwnPropertyDescriptors:function(t){var e,n,s=r(t),l=i.f,c=a(s),u={},f=0;while(c.length>f)n=l(s,e=c[f++]),void 0!==n&&o(u,e,n);return u}})},9093:function(t,e,n){var s=n("ce10"),a=n("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return s(t,a)}},"990b":function(t,e,n){var s=n("9093"),a=n("2621"),r=n("cb7c"),i=n("7726").Reflect;t.exports=i&&i.ownKeys||function(t){var e=s.f(r(t)),n=a.f;return n?e.concat(n(t)):e}},ac6a:function(t,e,n){for(var s=n("cadf"),a=n("0d58"),r=n("2aba"),i=n("7726"),o=n("32e9"),l=n("84f2"),c=n("2b4c"),u=c("iterator"),f=c("toStringTag"),d=l.Array,m={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},b=a(m),p=0;p<b.length;p++){var v,g=b[p],h=m[g],C=i[g],y=C&&C.prototype;if(y&&(y[u]||o(y,u,d),y[f]||o(y,f,g),l[g]=d,h))for(v in s)y[v]||r(y,v,s[v],!0)}},b4c4:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ProfileHeader",{attrs:{msg:t.users.user.user}}),n("div",{staticClass:"container"},[n("div",{staticClass:"row my-3"},[n("div",{staticClass:"centerContent col-lg-12 col-md-12"},[n("div",{staticClass:"shadow  mb-2 bg-white newsContent"},[n("div",{staticClass:"underLine  p-2 spaceBox"},[n("h1",{staticClass:"title-md"},[t._v(t._s(t.album.title))]),n("div",[n("a",{staticClass:"btn_3 pointer",on:{click:t.addImage}},[t._v("Add Photo")])]),n("div",[n("a",{staticClass:"btn_3 pointer",on:{click:t.addAlbum}},[t._v("Add Album")])])]),n("div",{staticClass:"photoListBox p-3"},[n("div",{staticClass:"tab-content py-3",attrs:{id:"myTabContent"}},[n("div",{staticClass:"photoListBox p-3"},[n("ul",{staticClass:"photoList"},t._l(t.album.images,(function(t){return n("li",{key:t._id},[n("a",{attrs:{href:"javascript:void(0);"}},[n("img",{attrs:{src:t.imageId.link,alt:""}})])])})),0)])])])])])])])],1)},a=[],r=(n("8e6e"),n("ac6a"),n("456d"),n("bd86")),i=n("4356"),o=n("2f62"),l=n("7a49");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,s)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(n,!0).forEach((function(e){Object(r["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var f=new l["a"],d={name:"Album",components:{ProfileHeader:i["a"]},data:function(){return Object(r["a"])({album:"",parent:""},"album",{})},methods:u({},Object(o["b"])(["createImage","CreateAlbum","getMyAlbum"]),{addImage:function(){var t=this;this.$swal({title:"Input something",html:'<input type="file" id="swal-input1" class="swal2-input">\n                    <select id="swal-input2" v-model="parent" name="parent" class="form-control">\n                        <option value="">nothing</option>\n                        '.concat(this.photo.albums.docs.map((function(t){return'<option value="'.concat(t.title,'">').concat(t.title,"</option>")})),"\n                    </select>"),showCancelButton:!0,confirmButtonClass:"btn btn-success btn-fill",cancelButtonClass:"btn btn-danger btn-fill",buttonsStyling:!1,preConfirm:function(){return new Promise((function(t){t([document.getElementById("swal-input1").files[0],document.getElementById("swal-input2").value])}))}}).then((function(e){e.value?t.createImage({data:e.value,token:f.getToken()}).then((function(e){e.success?(t.getMyAlbums({token:f.getToken()}),t.$swal({type:"success",html:"Image successfully created",confirmButtonClass:"btn btn-success btn-fill",buttonsStyling:!1}),t.$router.push("/photos")):t.$swal({type:"warning",html:e.message,confirmButtonClass:"btn btn-success btn-fill",buttonsStyling:!1})})):t.$swal.noop})).catch(this.$swal.noop)},addAlbum:function(){var t=this;this.$swal({title:"Input something",input:"text",showCancelButton:!0,confirmButtonClass:"btn btn-success btn-fill",cancelButtonClass:"btn btn-danger btn-fill",buttonsStyling:!1}).then((function(e){e.value?(t.CreateAlbum({title:e.value,token:f.getToken()}).then((function(e){e.success&&(t.getMyAlbums({token:f.getToken()}),t.$router.push("/photos"))})),t.$swal({type:"success",html:"Image successfully created",confirmButtonClass:"btn btn-success btn-fill",buttonsStyling:!1})):t.$swal.noop})).catch(this.$swal.noop)}}),created:function(){var t=this;this.getMyAlbum({token:f.getToken(),id:this.$route.params.id}).then((function(e){t.album=e.album}))},computed:u({},Object(o["c"])(["users","photo"]))},m=d,b=n("2877"),p=Object(b["a"])(m,s,a,!1,null,null,null);e["default"]=p.exports},bd86:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var s=n("85f2"),a=n.n(s);function r(t,e,n){return e in t?a()(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},f1ae:function(t,e,n){"use strict";var s=n("86cc"),a=n("4630");t.exports=function(t,e,n){e in t?s.f(t,e,a(0,n)):t[e]=n}}}]);
//# sourceMappingURL=chunk-6361591f.38ab22c7.js.map