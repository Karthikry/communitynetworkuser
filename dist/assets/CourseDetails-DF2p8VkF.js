import{r as o,N as w,O as D,j as e,M as S,T as t,G as l,a as B,d as I,b as d,B as u}from"./index-8vjFNNnn.js";import{d as k}from"./InfoOutlined-CWFLMp8d.js";import{f as A}from"./UpskillsCategoryApi-CqSaccJs.js";const M=()=>{const[a,x]=o.useState([]),[i,h]=o.useState(!1),[c,m]=o.useState(null),p=w(),{categoryId:n,categoryName:g}=p.state||{},f={"Content-type":"application/json",Authorization:"Bearer "+JSON.parse(sessionStorage.getItem("user")).accessToken},j=D(),b=async()=>{try{const r=(await A(f,n)).data;r&&x(r)}catch(s){console.error("Error fetching courses:",s)}};o.useEffect(()=>{n&&b()},[n]);const y=()=>{h(!0)},C=(s,r)=>{s.stopPropagation(),m(c===r?null:r)},v=s=>{j("course-details",{state:{courseId:s}})};return e.jsxs(e.Fragment,{children:[e.jsx(S,{children:e.jsxs(t,{variant:"h3",gutterBottom:!0,children:["Course Details for ",g]})}),e.jsx(l,{container:!0,spacing:2,children:(i?a:a.slice(0,4)).map(s=>e.jsx(l,{item:!0,xs:12,sm:6,md:4,lg:4,children:e.jsx(B,{sx:{border:"1px solid #ccc",borderRadius:"8px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",transition:"transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out","&:hover":{transform:"scale(1.03)",boxShadow:"0 8px 16px rgba(0, 0, 0, 0.2)",cursor:"pointer"},margin:2},onClick:()=>v(s.courseId),children:e.jsxs(I,{children:[s.videoUrl&&e.jsx("iframe",{title:"YouTube Video",src:`https://www.youtube.com/embed/${s.videoUrl}`,frameBorder:"0",allowFullScreen:!0,style:{width:"100%",height:"190px",marginBottom:"1rem"}}),e.jsxs(t,{variant:"h4",sx:{mb:1},children:[s.courseName,e.jsx(d,{sx:{justifyContent:"right",alignItems:"center",borderRadius:"50%",backgroundColor:"transparent","&:hover":{backgroundColor:"action.hover"}},onClick:r=>C(r,s.courseId),children:e.jsx(k,{})})]}),e.jsxs(u,{sx:{display:"flex",alignItems:"center"},children:[e.jsxs(t,{variant:"h6",children:["₹",s.sellingPrice]}),e.jsxs(t,{variant:"body1",sx:{color:"text.secondary",textDecoration:"line-through",ml:2},children:["₹",s.courseMrp]}),e.jsxs(t,{variant:"body2",sx:{color:"green",ml:2},children:[s.discount,"% off"]})]}),c===s.courseId&&e.jsx(t,{variant:"body2",sx:{mt:1},children:s.description})]})})},s.courseId))}),a.length>4&&!i&&e.jsx(u,{sx:{textAlign:{sm:"right",xs:"center"},mt:2,mr:2},children:e.jsx(d,{variant:"contained",color:"primary",onClick:y,children:"View All"})})]})};export{M as default};
