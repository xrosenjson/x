(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@ant-design/x"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@ant-design/x"]||[]).push([["6e502c7e"],{"6e502c7e":function(e,t,i){"use strict";i.d(t,"__esModule",{value:!0}),i.d(t,"default",{enumerable:!0,get:function(){return s;}});var s=i("777fffbe")._(i("af7442be")).default;},af7442be:function(e,t,i){"use strict";var s=i("852bbaa9")._;i.d(t,"__esModule",{value:!0}),i.d(t,"default",{enumerable:!0,get:function(){return b;}});var l=i("777fffbe"),n=i("852bbaa9"),a=i("8090cfc0"),d=i("c5d21053"),r=i("dc2b9ca7"),c=i("3a2876c3"),o=n._(i("3e6b097d")),u=i("0ba2ace3"),f=l._(i("30115f70"));let h=o.default.lazy(()=>Promise.all([i.ensure("vendors_3"),i.ensure("vendors_2"),i.ensure("6dfb3fa1")]).then(i.dr(s,i.bind(i,"6dfb3fa1")))),g=(0,u.createStyles)(({token:e,css:t})=>({editor:t`
      margin-top: ${e.headerHeight-e.padding}px;
    `})),m={cn:{title:"\u4E3B\u9898\u7F16\u8F91\u5668",save:"\u4FDD\u5B58",edit:"\u7F16\u8F91",export:"\u5BFC\u51FA",editModelTitle:"\u7F16\u8F91\u4E3B\u9898\u914D\u7F6E",editJsonContentTypeError:"\u4E3B\u9898 JSON \u683C\u5F0F\u9519\u8BEF",editSuccessfully:"\u7F16\u8F91\u6210\u529F",saveSuccessfully:"\u4FDD\u5B58\u6210\u529F",initialEditor:"\u6B63\u5728\u521D\u59CB\u5316\u7F16\u8F91\u5668..."},en:{title:"Theme Editor",save:"Save",edit:"Edit",export:"Export",editModelTitle:"edit Theme Config",editJsonContentTypeError:"The theme of the JSON format is incorrect",editSuccessfully:"Edited successfully",saveSuccessfully:"Saved successfully",initialEditor:"Initializing Editor..."}},p="ant-design-v5-theme-editor-theme";var b=()=>{let{message:e}=d.App.useApp(),[t,i]=(0,f.default)(m),{styles:s}=g(),[l,n]=o.default.useState({});return(0,o.useEffect)(()=>{let e=localStorage.getItem(p);e&&n(JSON.parse(e));},[]),(0,a.jsxs)("div",{className:s.editor,children:[(0,a.jsxs)(c.Helmet,{children:[(0,a.jsx)("title",{children:`${t.title} - Ant Design X`}),(0,a.jsx)("meta",{property:"og:title",content:`${t.title} - Ant Design X`})]}),(0,a.jsx)(o.Suspense,{fallback:(0,a.jsx)(d.Skeleton,{style:{margin:24}}),children:(0,a.jsx)(h,{advanced:!0,hideAdvancedSwitcher:!0,theme:{name:"Custom Theme",key:"test",config:l},style:{height:"calc(100vh - 64px)"},onThemeChange:e=>{n(e.config);},locale:"cn"===i?r.zhCN:r.enUS,actions:(0,a.jsx)(d.Button,{type:"primary",onClick:()=>{localStorage.setItem(p,JSON.stringify(l)),e.success(t.saveSuccessfully);},children:t.save})})})]});};}}]);
//# sourceMappingURL=6e502c7e-async.822361b9.js.map