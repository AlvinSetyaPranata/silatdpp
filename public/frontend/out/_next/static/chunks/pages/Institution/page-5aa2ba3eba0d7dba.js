(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[897],{3369:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Institution/page",function(){return s(7414)}])},2582:function(e,t,s){"use strict";var n=s(5893),a=s(1664),l=s.n(a);t.Z=e=>{let{pageName:t}=e;return(0,n.jsxs)("div",{className:"mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",children:[(0,n.jsx)("h2",{className:"text-title-md2 font-semibold text-black dark:text-white",children:t}),(0,n.jsx)("nav",{children:(0,n.jsxs)("ol",{className:"flex items-center gap-2",children:[(0,n.jsx)("li",{children:(0,n.jsx)(l(),{className:"font-medium",href:"/",children:"Dashboard /"})}),(0,n.jsx)("li",{className:"font-medium text-primary",children:t})]})})]})}},7031:function(e,t,s){"use strict";s.d(t,{Z:function(){return o}});var n=s(5893),a=s(1664),l=s.n(a),i=s(7294),r=s(44),o=e=>{let{name:t,addButtonName:s,addButtonLink:a,column:o,data:c,detailLink:d={name:"Pengaturan",to:"#"}}=e,[m,u]=(0,i.useState)(""),[x,h]=(0,i.useState)(c),[f,p]=(0,i.useState)("name");return(0,n.jsxs)("div",{className:"w-full bg-white px-4 py-2",children:[(0,n.jsxs)("div",{className:"flex w-full flex-col border-b-[1px] border-b-slate-400 py-2 lg:flex-row lg:items-center lg:justify-between",children:[(0,n.jsx)("h1",{className:"text-lg font-semibold text-black",children:t}),(0,n.jsx)("div",{className:"flex lg:justify-end",children:(0,n.jsx)(l(),{href:a,className:"mb-4 mt-2 rounded-md bg-blue-500 px-2 py-3 text-sm text-white",children:s})})]}),(0,n.jsxs)("div",{className:"grid grid-cols-2 gap-x-2 gap-y-4 py-6",children:[(0,n.jsxs)("div",{className:"col-span-2 flex items-center rounded-md border-[1.5px] border-slate-300 px-2 py-2 text-sm",children:[(0,n.jsx)("input",{className:"w-full flex-1 outline-none",onChange:e=>{let t=e.target.value.toLowerCase();u(t);let s=c.filter(e=>e[f].toLowerCase().includes(t));""==t?h(c):h(s)},value:m,type:"text",placeholder:"Cari data"}),(0,n.jsx)("button",{onClick:()=>{u(""),h(c)},className:"".concat(""==m?"hidden":"block"),children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-4",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18 18 6M6 6l12 12"})})})]}),(0,n.jsxs)("select",{onChange:e=>p(e.target.value),value:f,className:"rounded-md px-3 py-2 text-sm font-medium",name:"",id:"",children:[(0,n.jsx)("option",{value:"",disabled:!0,children:"Kategori"}),Object.keys(c[0]).map((e,t)=>(0,n.jsx)("option",{value:e,children:e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join(" ")},t))]}),(0,n.jsx)("button",{className:"rounded-md bg-gray-200 px-3 py-2 text-sm font-medium",children:"Export"})]}),(0,n.jsx)(r.ZP,{title:"",className:"mt-4",data:x,columns:o,pagination:!0,highlightOnHover:!0,customStyles:{rows:{style:{fontSize:"1rem"}},headCells:{style:{fontSize:"1rem",fontWeight:"bold"}},cells:{style:{fontSize:"1rem"}}}})]})}},7414:function(e,t,s){"use strict";s.r(t);var n=s(5893);s(7294);var a=s(2582),l=s(7031),i=s(1664),r=s.n(i);t.default=e=>{let{data:t}=e;return t?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a.Z,{pageName:"Buku Institusi"}),(0,n.jsx)(l.Z,{addButtonName:"Tambah Institusi",addButtonLink:"/institution/addData",name:"Daftar Institusi",column:[{name:"Nama Institusi",selector:e=>e.nama,sortable:!0},{name:"Alamat Institusi",selector:e=>e.alamat,sortable:!0},{name:"No Telepon Institusi",selector:e=>e.kontak,sortable:!0},{name:"Aksi",cell:e=>(0,n.jsx)(r(),{className:"text-blue-500 hover:underline",href:"/guestBook/".concat(e.id),children:"Edit"})}],data:t,detailLink:{name:"Pengaturan",to:"/institution"}})]}):(0,n.jsx)("h1",{children:"Not Available"})}}},function(e){e.O(0,[664,44,888,774,179],function(){return e(e.s=3369)}),_N_E=e.O()}]);