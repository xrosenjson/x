(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@ant-design/x"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@ant-design/x"]||[]).push([["9e8e2db3"],{"4d5d30ce":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return p;}});var s=n("777fffbe"),a=n("8090cfc0");n("c87eb03e");var o=n("2020273b"),l=n("f153e352"),i=n("c5d21053"),r=s._(n("3e6b097d"));let c="https://api.example.com",d="/chat",u=(0,l.XRequest)({baseURL:c+d,model:"gpt-3.5-turbo"});var p=()=>{let[e,t]=r.default.useState(),[n,s]=r.default.useState([]);async function p(){t("pending"),await u.create({messages:[{role:"user",content:"hello, who are u?"}],stream:!0},{onSuccess:e=>{t("success"),console.log("onSuccess",e);},onError:e=>{t("error"),console.error("onError",e);},onUpdate:e=>{s(t=>[...t,e]),console.log("onUpdate",e);}});}return(0,a.jsxs)(i.Space,{align:"start",size:16,children:[(0,a.jsxs)(i.Button,{type:"primary",disabled:"pending"===e,onClick:p,children:["Request - ",c,d]}),(0,a.jsx)(l.ThoughtChain,{items:[{title:"Request Log",status:e,icon:"pending"===e?(0,a.jsx)(o.LoadingOutlined,{}):(0,a.jsx)(o.TagsOutlined,{}),description:"error"===e&&u.baseURL===c+d&&"Please replace the BASE_URL, PATH, MODEL, API_KEY with your own values.",content:(0,a.jsxs)(i.Descriptions,{column:1,children:[(0,a.jsx)(i.Descriptions.Item,{label:"Status",children:e||"-"}),(0,a.jsx)(i.Descriptions.Item,{label:"Update Times",children:n.length})]})}]})]});};},"8da595c8":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return m;}});var s=n("777fffbe"),a=n("8090cfc0");n("b3e8d383");var o=n("f153e352"),l=n("c5d21053"),i=s._(n("3e6b097d")),r=n("2020273b");let c="https://api.example.host",d="/chat";async function u(){let e=`{data:{"id":"0","choices":[{"index":0,"delta":{"content":"Hello","role":"assistant"}}],"created":1733129200,"model":"gpt-4o"}}
{data:{"id":"1","choices":[{"index":1,"delta":{"content":"world!","role":"assistant"}}],"created":1733129300,"model":"gpt-4o"}}
{data:{"id":"2","choices":[{"index":2,"delta":{"content":"I","role":"assistant"}}],"created":1733129400,"model":"gpt-4o"}}
{data:{"id":"3","choices":[{"index":3,"delta":{"content":"am","role":"assistant"}}],"created":1733129500,"model":"gpt-4o"}}
{data:{"id":"4","choices":[{"index":4,"delta":{"content":"Ant Design X!","role":"assistant"}}],"created":1733129600,"model":"gpt-4o"}}`.split("\n");return new Response(new ReadableStream({async start(t){for(let n of e)await new Promise(e=>setTimeout(e,100)),t.enqueue(new TextEncoder().encode(n));t.close();}}),{headers:{"Content-Type":"application/x-ndjson"}});}let p=(0,o.XRequest)({baseURL:c+d,model:"gpt-4o",fetch:u});var m=()=>{let[e,t]=i.default.useState(),[n,s]=i.default.useState([]);async function u(){t("pending"),await p.create({messages:[{role:"user",content:"hello, who are u?"}],stream:!0},{onSuccess:e=>{t("success"),console.log("onSuccess",e);},onError:e=>{t("error"),console.error("onError",e);},onUpdate:e=>{s(t=>[...t,e]),console.log("onUpdate",e);}},new TransformStream({transform(e,t){t.enqueue(e);}}));}return(0,a.jsxs)(l.Space,{align:"start",size:16,children:[(0,a.jsxs)(l.Button,{type:"primary",disabled:"pending"===e,onClick:u,children:["Request - ",c,d]}),(0,a.jsx)(o.ThoughtChain,{items:[{title:"Mock Custom Protocol - Log",status:e,icon:(0,a.jsx)(r.TagsOutlined,{}),content:(0,a.jsx)("pre",{style:{overflow:"scroll"},children:(0,a.jsx)("code",{children:n.join("\n")})})}]})]});};},"908b4f31":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return u;}});var s=n("777fffbe"),a=n("8090cfc0");n("a6e3ab64");var o=n("2020273b"),l=n("f153e352"),i=n("c5d21053"),r=s._(n("3e6b097d"));let c=["INVITE sip:[email protected] SIP/2.0\n","Via: SIP/2.0/UDP [host];branch=123456\n","Content-Type: application/sdp\n\n"],d=["v=0\n","o=alice 2890844526 2890844526 IN IP4 [host]\n","s=\n","c=IN IP4 [host]\n","t=0 0\n","m=audio 49170 RTP/AVP 0\n","a=rtpmap:0 PCMU/8000\n","m=video 51372 RTP/AVP 31\n","a=rtpmap:31 H261/90000\n","m=video 53000 RTP/AVP 32\n","a=rtpmap:32 MPV/90000\n\n"];var u=()=>{let[e,t]=r.default.useState([]);async function n(){for await(let e of(0,l.XStream)({readableStream:new ReadableStream({async start(e){for(let t of c.concat(d))await new Promise(e=>setTimeout(e,100)),e.enqueue(new TextEncoder().encode(t));e.close();}}),transformStream:new TransformStream({transform(e,t){t.enqueue(e);}})}))t(t=>[...t,e]);}return(0,a.jsxs)(i.Splitter,{children:[(0,a.jsx)(i.Splitter.Panel,{children:(0,a.jsx)(i.Button,{type:"primary",onClick:n,style:{marginBottom:16},children:"Mock Custom Protocol - SIP"})}),(0,a.jsx)(i.Splitter.Panel,{style:{marginLeft:16},children:(0,a.jsx)(l.ThoughtChain,{items:e.length?[{title:"Mock Custom Protocol - Log",status:"success",icon:(0,a.jsx)(o.TagsOutlined,{}),content:(0,a.jsx)("pre",{style:{overflow:"scroll"},children:(0,a.jsx)("code",{children:e.join("")})})}]:[]})})]});};},"9115e379":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return h;}});var s=n("852bbaa9"),a=n("8090cfc0");n("62cc56cd");var o=n("f153e352"),l=n("0ba2ace3"),i=s._(n("3e6b097d")),r=n("2020273b"),c=n("c5d21053");let d=(e,t)=>(0,a.jsxs)(c.Space,{align:"start",children:[e,(0,a.jsx)("span",{children:t})]}),u=[{key:"0",label:"What is Ant Design X?"}],p=(0,l.createStyles)(({token:e,css:t})=>({layout:t`
      width: 100%;
      min-width: 1000px;
      height: 722px;
      border-radius: ${e.borderRadius}px;
      display: flex;
      background: ${e.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${e.fontFamily}, sans-serif;

      .ant-prompts {
        color: ${e.colorText};
      }
    `,menu:t`
      background: ${e.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
    `,conversations:t`
      padding: 0 12px;
      flex: 1;
      overflow-y: auto;
    `,chat:t`
      height: 100%;
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: ${e.paddingLG}px;
      gap: 16px;
    `,messages:t`
      flex: 1;
    `,placeholder:t`
      padding-top: 32px;
    `,sender:t`
      box-shadow: ${e.boxShadow};
    `,logo:t`
      display: flex;
      height: 72px;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;

      img {
        width: 24px;
        height: 24px;
        display: inline-block;
      }

      span {
        display: inline-block;
        margin: 0 8px;
        font-weight: bold;
        color: ${e.colorText};
        font-size: 16px;
      }
    `,addBtn:t`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      width: calc(100% - 24px);
      margin: 0 12px 24px 12px;
    `})),m=[{key:"1",label:d((0,a.jsx)(r.FireOutlined,{style:{color:"#FF4D4F"}}),"Hot Topics"),description:"What are you interested in?",children:[{key:"1-1",description:"What's new in X?"},{key:"1-2",description:"What's AGI?"},{key:"1-3",description:"Where is the doc?"}]},{key:"2",label:d((0,a.jsx)(r.ReadOutlined,{style:{color:"#1890FF"}}),"Design Guide"),description:"How to design a good product?",children:[{key:"2-1",icon:(0,a.jsx)(r.HeartOutlined,{}),description:"Know the well"},{key:"2-2",icon:(0,a.jsx)(r.SmileOutlined,{}),description:"Set the AI role"},{key:"2-3",icon:(0,a.jsx)(r.CommentOutlined,{}),description:"Express the feeling"}]}],g=[{key:"1",description:"Hot Topics",icon:(0,a.jsx)(r.FireOutlined,{style:{color:"#FF4D4F"}})},{key:"2",description:"Design Guide",icon:(0,a.jsx)(r.ReadOutlined,{style:{color:"#1890FF"}})}],f={ai:{placement:"start",typing:{step:5,interval:20},styles:{content:{borderRadius:16}}},local:{placement:"end",variant:"shadow"}};var h=()=>{let{styles:e}=p(),[t,n]=i.default.useState(!1),[s,l]=i.default.useState(""),[d,h]=i.default.useState(u),[x,b]=i.default.useState(u[0].key),[y,j]=i.default.useState([]),[v]=(0,o.useXAgent)({request:async({message:e},{onSuccess:t})=>{t(`Mock success return. You said: ${e}`);}}),{onRequest:S,messages:A,setMessages:w}=(0,o.useXChat)({agent:v});(0,i.useEffect)(()=>{void 0!==x&&w([]);},[x]);let k=e=>{S(e.data.description);},C=(0,a.jsxs)(c.Space,{direction:"vertical",size:16,className:e.placeholder,children:[(0,a.jsx)(o.Welcome,{variant:"borderless",icon:"https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp",title:"Hello, I'm Ant Design X",description:"Base on Ant Design, AGI product interface solution, create a better intelligent vision~",extra:(0,a.jsxs)(c.Space,{children:[(0,a.jsx)(c.Button,{icon:(0,a.jsx)(r.ShareAltOutlined,{})}),(0,a.jsx)(c.Button,{icon:(0,a.jsx)(r.EllipsisOutlined,{})})]})}),(0,a.jsx)(o.Prompts,{title:"Do you want?",items:m,styles:{list:{width:"100%"},item:{flex:1}},onItemClick:k})]}),P=A.map(({id:e,message:t,status:n})=>({key:e,loading:"loading"===n,role:"local"===n?"local":"ai",content:t})),T=(0,a.jsx)(c.Badge,{dot:y.length>0&&!t,children:(0,a.jsx)(c.Button,{type:"text",icon:(0,a.jsx)(r.PaperClipOutlined,{}),onClick:()=>n(!t)})}),_=(0,a.jsx)(o.Sender.Header,{title:"Attachments",open:t,onOpenChange:n,styles:{content:{padding:0}},children:(0,a.jsx)(o.Attachments,{beforeUpload:()=>!1,items:y,onChange:e=>j(e.fileList),placeholder:e=>"drop"===e?{title:"Drop file here"}:{icon:(0,a.jsx)(r.CloudUploadOutlined,{}),title:"Upload files",description:"Click or drag files to this area to upload"}})}),R=(0,a.jsxs)("div",{className:e.logo,children:[(0,a.jsx)("img",{src:"https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original",draggable:!1,alt:"logo"}),(0,a.jsx)("span",{children:"Ant Design X"})]});return(0,a.jsxs)("div",{className:e.layout,children:[(0,a.jsxs)("div",{className:e.menu,children:[R,(0,a.jsx)(c.Button,{onClick:()=>{h([...d,{key:`${d.length}`,label:`New Conversation ${d.length}`}]),b(`${d.length}`);},type:"link",className:e.addBtn,icon:(0,a.jsx)(r.PlusOutlined,{}),children:"New Conversation"}),(0,a.jsx)(o.Conversations,{items:d,className:e.conversations,activeKey:x,onActiveChange:e=>{b(e);}})]}),(0,a.jsxs)("div",{className:e.chat,children:[(0,a.jsx)(o.Bubble.List,{items:P.length>0?P:[{content:C,variant:"borderless"}],roles:f,className:e.messages}),(0,a.jsx)(o.Prompts,{items:g,onItemClick:k}),(0,a.jsx)(o.Sender,{value:s,header:_,onSubmit:e=>{e&&(S(e),l(""));},onChange:l,prefix:T,loading:v.isRequesting(),className:e.sender})]})]});};},"944793d1":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return r;}});var s=n("777fffbe"),a=n("8090cfc0");n("c49af9f9");var o=n("f153e352"),l=n("c5d21053"),i=s._(n("3e6b097d")),r=()=>{let[e,t]=i.default.useState([]),[n]=l.Form.useForm(),s=e=>{t(t=>[...t,e]);},[r]=(0,o.useXAgent)({request:({message:e},{onUpdate:t,onSuccess:n})=>{let s=0,a=setInterval(()=>{s+=1,t(`Thinking...(${s}/3)`),s>=3&&(n(`It's funny that you ask: ${e}`),clearInterval(a));},500);}});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(l.Form,{form:n,layout:"vertical",onFinish:({question:e})=>{s(`[You] Ask: ${e}`),r.request({message:e},{onUpdate:e=>{s(`[Agent] Update: ${e}`);},onSuccess:e=>{s(`[Agent] Answer: ${e}`),n.setFieldsValue({question:""});},onError:()=>{}});},autoComplete:"off",children:[(0,a.jsx)(l.Form.Item,{label:"Question",name:"question",children:(0,a.jsx)(l.Input,{})}),(0,a.jsx)(l.Button,{htmlType:"submit",type:"primary",loading:r.isRequesting(),children:"submit"})]}),(0,a.jsx)(l.Divider,{}),(0,a.jsx)(l.Typography,{children:(0,a.jsx)("ul",{children:e.map((e,t)=>(0,a.jsx)("li",{children:e},t))})})]});};},a2aabc43:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return p;}});var s=n("777fffbe"),a=n("8090cfc0");n("17ac3f7d");var o=n("2020273b"),l=n("f153e352"),i=n("c5d21053"),r=s._(n("3e6b097d"));let c=()=>new Promise(e=>setTimeout(e,1e3)),d={ai:{placement:"start",avatar:{icon:(0,a.jsx)(o.UserOutlined,{}),style:{background:"#fde3cf"}},typing:{step:5,interval:20},style:{maxWidth:600}},local:{placement:"end",avatar:{icon:(0,a.jsx)(o.UserOutlined,{}),style:{background:"#87d068"}}}},u=!1;var p=()=>{let[e,t]=r.default.useState(""),[n]=(0,l.useXAgent)({request:async({message:e},{onSuccess:t,onError:n})=>{await c(),(u=!u)&&t(`Mock success return. You said: ${e}`),n(Error("Mock request failed"));}}),{onRequest:s,messages:o}=(0,l.useXChat)({agent:n,requestPlaceholder:"Waiting...",requestFallback:"Mock failed return. Please try again later."});return(0,a.jsxs)(i.Flex,{vertical:!0,gap:"middle",children:[(0,a.jsx)(l.Bubble.List,{roles:d,style:{maxHeight:300},items:o.map(({id:e,message:t,status:n})=>({key:e,loading:"loading"===n,role:"local"===n?"local":"ai",content:t}))}),(0,a.jsx)(l.Sender,{loading:n.isRequesting(),value:e,onChange:t,onSubmit:e=>{s(e),t("");}})]});};},a9b8685d:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return d;}});var s=n("777fffbe"),a=n("8090cfc0");n("7d70c408");var o=n("2020273b"),l=n("f153e352"),i=n("c5d21053"),r=s._(n("3e6b097d"));let c=["He","llo",", w","or","ld!"];var d=()=>{let[e,t]=r.default.useState([]),n=e.map(e=>JSON.parse(e.data).content).join("");async function s(){for await(let e of(0,l.XStream)({readableStream:function(){let e=[];for(let t=0;t<c.length;t++){let n=`event: message
data: {"id":"${t}","content":"${c[t]}"}

`;e.push(n);}return new ReadableStream({async start(t){for(let n of e)await new Promise(e=>setTimeout(e,100)),t.enqueue(new TextEncoder().encode(n));t.close();}});}()}))console.log(e),t(t=>[...t,e]);}return(0,a.jsxs)(i.Splitter,{children:[(0,a.jsxs)(i.Splitter.Panel,{children:[(0,a.jsx)(i.Button,{type:"primary",onClick:s,style:{marginBottom:16},children:"Mock Default Protocol - SSE"}),n&&(0,a.jsx)(l.Bubble,{content:n})]}),(0,a.jsx)(i.Splitter.Panel,{style:{marginLeft:16},children:(0,a.jsx)(l.ThoughtChain,{items:e.length?[{title:"Mock Default Protocol - Log",status:"success",icon:(0,a.jsx)(o.TagsOutlined,{}),content:(0,a.jsx)("pre",{style:{overflow:"scroll"},children:e.map(e=>(0,a.jsx)("code",{children:e.data},e.data))})}]:[]})})]});};},e1e5b621:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return u;}});var s=n("777fffbe"),a=n("8090cfc0");n("56d7227d");var o=n("2020273b"),l=n("f153e352"),i=n("c5d21053"),r=s._(n("3e6b097d"));let c=()=>new Promise(e=>setTimeout(e,1e3)),d={user:{placement:"end",avatar:{icon:(0,a.jsx)(o.UserOutlined,{}),style:{background:"#87d068"}}},text:{placement:"start",avatar:{icon:(0,a.jsx)(o.UserOutlined,{}),style:{background:"#fde3cf"}},typing:!0},suggestion:{placement:"start",avatar:{icon:(0,a.jsx)(o.UserOutlined,{}),style:{visibility:"hidden"}},variant:"borderless",messageRender:e=>(0,a.jsx)(l.Prompts,{vertical:!0,items:e.map(e=>({key:e,icon:(0,a.jsx)(o.SmileOutlined,{style:{color:"#FAAD14"}}),description:e}))})}};var u=()=>{let[e,t]=r.default.useState(""),[n]=(0,l.useXAgent)({request:async({message:e},{onSuccess:t})=>{await c();let{content:n}=e||{};t({type:"ai",list:[{type:"text",content:"Do you want?"},{type:"suggestion",content:[`Look at: ${n}`,`Search: ${n}`,`Try: ${n}`]}]});}}),{onRequest:s,parsedMessages:o}=(0,l.useXChat)({agent:n,defaultMessages:[{id:"init",message:{type:"ai",content:"Hello, what can I do for you?"},status:"success"}],requestPlaceholder:{type:"ai",content:"Waiting..."},parser:e=>((e.content?[e]:e.list)||[]).map(e=>({role:e.type,content:e.content}))});return(0,a.jsxs)(i.Flex,{vertical:!0,gap:"middle",children:[(0,a.jsx)(l.Bubble.List,{roles:d,style:{maxHeight:300},items:o.map(({id:e,message:t,status:n})=>({key:e,loading:"loading"===n,...t}))}),(0,a.jsx)(l.Sender,{loading:n.isRequesting(),value:e,onChange:t,onSubmit:e=>{s({type:"user",content:e}),t("");}})]});};},eec69957:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return d;}});var s=n("777fffbe"),a=n("8090cfc0");n("80ed046e");var o=n("2020273b"),l=n("f153e352"),i=n("c5d21053"),r=s._(n("3e6b097d"));let c={ai:{placement:"start",avatar:{icon:(0,a.jsx)(o.UserOutlined,{}),style:{background:"#fde3cf"}}},local:{placement:"end",avatar:{icon:(0,a.jsx)(o.UserOutlined,{}),style:{background:"#87d068"}}}};var d=()=>{let[e,t]=r.default.useState(""),[n]=(0,l.useXAgent)({request:async({message:e},{onSuccess:t,onUpdate:n})=>{let s=`Streaming output instead of Bubble typing effect. You typed: ${e}`,a="",o=setInterval(()=>{n(a=s.slice(0,a.length+2)),a===s&&(clearInterval(o),t(s));},100);}}),{onRequest:s,messages:o}=(0,l.useXChat)({agent:n});return(0,a.jsxs)(i.Flex,{vertical:!0,gap:"middle",children:[(0,a.jsx)(l.Bubble.List,{roles:c,style:{maxHeight:300},items:o.map(({id:e,message:t,status:n})=>({key:e,role:"local"===n?"local":"ai",content:t}))}),(0,a.jsx)(l.Sender,{loading:n.isRequesting(),value:e,onChange:t,onSubmit:e=>{s(e),t("");}})]});};},f319ec90:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return u;}});var s=n("777fffbe"),a=n("8090cfc0");n("3a942388");var o=n("2020273b"),l=n("f153e352"),i=n("c5d21053"),r=s._(n("3e6b097d"));let c="https://api.example.com",d="/chat";var u=()=>{let[e,t]=r.default.useState(),[n,s]=r.default.useState([]),[u]=(0,l.useXAgent)({baseURL:c+d,model:"gpt-3.5-turbo"});async function p(){t("pending"),u.request({messages:[{role:"user",content:"hello, who are u?"}],stream:!0},{onSuccess:e=>{t("success"),console.log("onSuccess",e);},onError:e=>{t("error"),console.error("onError",e);},onUpdate:e=>{s(t=>[...t,e]),console.log("onUpdate",e);}});}return(0,a.jsxs)(i.Splitter,{children:[(0,a.jsx)(i.Splitter.Panel,{children:(0,a.jsx)(i.Button,{type:"primary",disabled:"pending"===e,onClick:p,children:"Agent Request"})}),(0,a.jsx)(i.Splitter.Panel,{children:(0,a.jsx)(l.ThoughtChain,{style:{marginLeft:16},items:[{title:"Agent Request Log",status:e,icon:"pending"===e?(0,a.jsx)(o.LoadingOutlined,{}):(0,a.jsx)(o.TagsOutlined,{}),description:"error"===e&&u.config.baseURL===c+d&&"Please replace the BASE_URL, PATH, MODEL, API_KEY with your own values.",content:(0,a.jsxs)(i.Descriptions,{column:1,children:[(0,a.jsx)(i.Descriptions.Item,{label:"Status",children:e||"-"}),(0,a.jsx)(i.Descriptions.Item,{label:"Update Times",children:n.length})]})}]})})]});};}}]);
//# sourceMappingURL=9e8e2db3-async.d7398749.js.map