import{f as u,r as c,j as r,M as Y,B as D,b,k as _,m as $,n as J,o as V,p as v,q as I,s as G,I as E,t as K,D as Q,v as X,w as x,x as Z}from"./index-8vjFNNnn.js";import{d as ee,h as w}from"./Add-BVPYQ0gu.js";import{E as re,D as oe}from"./Edit-BY8Zkq1m.js";const te=async(n,s)=>{try{const o=await u.post("https://executivetracking.cloudjiffy.net/Mahaasabha/promo/v1/createPromo",n,{headers:s});o.data.responseCode===201?alert("Promo added successfully"):alert(o.data.errorMessage||"An error occurred")}catch(o){alert("Error adding promo: "+o.message),console.error("Error adding promo:",o)}},ae=async n=>{try{return(await u.get("https://executivetracking.cloudjiffy.net/Mahaasabha/promo/v1/getAllPromoByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10",{headers:n})).data}catch(s){throw console.error("Error fetching promo data:",s),s}},se=async(n,s)=>{try{return(await u.get(`https://executivetracking.cloudjiffy.net/Mahaasabha/promo/v1/getPromoByPromoId/{promoId}?promoId=${s}`,{headers:n})).data}catch(o){throw console.error("Error fetching promo by ID:",o),o}},ne=async(n,s)=>{try{const o=await u.put("https://executivetracking.cloudjiffy.net/Mahaasabha/promo/v1/updatePromo",n,{headers:s});o.data.responseCode===201?alert(o.data.message):alert(o.data.errorMessage||"An unexpected error occurred")}catch(o){console.error("Error updating promo:",o),alert("Error updating promo: "+o.message)}},ie=async(n,s)=>{try{const o=await u.delete(`https://executivetracking.cloudjiffy.net/Mahaasabha/promo/v1/deletePromoById/${s}`,{headers:n});o.data.responseCode===200?alert(o.data.message):alert(o.data.errorMessage||"An unexpected error occurred")}catch(o){console.error("Error deleting promo:",o),alert("Error deleting promo: "+o.message)}},B=[{id:"promoId",label:"ID"},{id:"promoName",label:"Name",minWidth:100},{id:"description",label:"Description",minWidth:100},{id:"youTube",label:"Youtube"},{id:"createdBy",label:"Created By",align:"right"},{id:"updatedBy",label:"Updated By",align:"right"},{id:"insertedDate",label:"Inserted Date",align:"right"},{id:"updatedDate",label:"Updated Date",align:"right"},{id:"actions",label:"Actions",align:"right"}],pe=()=>{const[n,s]=c.useState(0),[o,C]=c.useState(10),[j,k]=c.useState([]),[S,p]=c.useState(!1),[g,P]=c.useState(!1),[l,T]=c.useState({}),[A,M]=c.useState(null),[U,R]=c.useState(!1),[a,h]=c.useState({promoName:"",description:"",youTube:""}),W=(e,t)=>{s(t)},q=e=>{C(+e.target.value),s(0)},y=JSON.parse(sessionStorage.getItem("user")),m={"Content-type":"application/json",Authorization:"Bearer "+y.accessToken},f=e=>{h({...a,[e.target.name]:e.target.value}),T({...l,[e.target.name]:null})},z=()=>{const e={};return(!a.promoName||a.promoName.trim()==="")&&(e.promoName="Enter the Advertisement name"),(!a.description||a.description.trim()==="")&&(e.description="Enter the description"),(!a.youTube||a.youTube.trim()==="")&&(e.youTube="Enter the YouTube URL"),e},N=async()=>{try{const i=((await ae(m)).content||[]).map(d=>({promoId:d.promoId,promoName:d.promoName,description:d.description,youTube:d.youTube,insertedDate:w(d.insertedDate).format("L"),updatedDate:w(d.updatedDate).format("L"),createdBy:d.createdBy&&d.createdBy.userName||"No User",updatedBy:d.updatedBy&&d.updatedBy.userName||"No User"}));k(i)}catch(e){console.error("Error fetching promo data:",e)}};c.useEffect(()=>{N()},[U]);const F=async e=>{await ie(m,e),N()},L=async e=>{P(!0),p(!0);try{const t=await se(m,e);t?(M(t.promoId),h({promoName:t.promoName,description:t.description,youTube:t.youTube})):console.error("No promo data found for id:",e)}catch(t){console.error("Error fetching promo details:",t)}},O=()=>{P(!1),h({promoName:"",description:"",youTube:""}),p(!0)},H=async e=>{e.preventDefault();const t=z();if(Object.keys(t).length>0)T(t);else try{if(g){const i={promoId:A,promoName:a.promoName,description:a.description,youTube:a.youTube,updatedBy:{userId:y.userId}};await ne(i,m)}else{const i={promoName:a.promoName,description:a.description,youTube:a.youTube,createdBy:{userId:y.userId}};await te(i,m)}h({promoName:"",description:"",youTube:""}),p(!1),R(i=>!i)}catch(i){console.error("Error saving promo:",i)}};return r.jsxs(Y,{title:r.jsxs(D,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsx("span",{children:"Promo"}),r.jsxs(b,{variant:"contained",color:"primary",sx:{display:"flex",alignItems:"center",fontSize:"15px"},onClick:O,children:["Add",r.jsx(ee,{})]})]}),children:[r.jsxs(_,{sx:{width:"100%",overflow:"hidden"},children:[r.jsx($,{children:r.jsxs(J,{stickyHeader:!0,children:[r.jsx(V,{children:r.jsx(v,{children:B.map(e=>r.jsx(I,{align:e.align,style:{minWidth:e.minWidth},children:e.label},e.id))})}),r.jsx(G,{children:j.slice(n*o,n*o+o).map(e=>r.jsx(v,{hover:!0,role:"checkbox",tabIndex:-1,children:B.map(t=>{const i=e[t.id];return r.jsx(I,{align:t.align,children:t.id==="youTube"?r.jsxs("a",{href:i,target:"_blank",rel:"noopener noreferrer",children:[i," "]}):t.id==="actions"?r.jsxs(r.Fragment,{children:[r.jsx(E,{color:"primary",onClick:()=>L(e.promoId),children:r.jsx(re,{})}),r.jsx(E,{color:"secondary",onClick:()=>F(e.promoId),children:r.jsx(oe,{})})]}):i},t.id)})},e.promoId))})]})}),r.jsx(K,{rowsPerPageOptions:[10,25,100],component:"div",count:j.length,rowsPerPage:o,page:n,onPageChange:W,onRowsPerPageChange:q})]}),r.jsxs(Q,{open:S,onClose:()=>p(!1),children:[r.jsx(X,{children:g?"Edit Promo":"Add Promo"}),r.jsxs(D,{component:"form",onSubmit:H,noValidate:!0,sx:{m:2},children:[r.jsx(x,{required:!0,name:"promoName",label:"Promo Name",value:a.promoName,onChange:f,error:!!l.promoName,helperText:l.promoName,fullWidth:!0}),r.jsx(x,{required:!0,name:"description",label:"Description",value:a.description,onChange:f,error:!!l.description,helperText:l.description,fullWidth:!0,multiline:!0,rows:3}),r.jsx(x,{required:!0,name:"youTube",label:"YouTube URL",value:a.youTube,onChange:f,error:!!l.youTube,helperText:l.youTube,fullWidth:!0}),r.jsxs(Z,{children:[r.jsx(b,{onClick:()=>p(!1),color:"primary",children:"Cancel"}),r.jsx(b,{type:"submit",color:"primary",children:g?"Update":"Add"})]})]})]})]})};export{pe as default};
