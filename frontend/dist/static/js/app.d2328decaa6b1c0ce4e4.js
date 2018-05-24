webpackJsonp([1],{"5YOq":function(e,t){},"7GQ7":function(e,t){},"9FWu":function(e,t){},"9MTr":function(e,t){},AJay:function(e,t){},HwxV:function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("7+uW"),n=a("zL8q"),i=a.n(n),l=(a("tvR6"),{render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]});var r=a("VU/8")({name:"App"},l,!1,function(e){a("gsu9")},null,null).exports,o=a("/ocq"),c=new s.default,u={name:"metric",data:()=>({options:[],input:"",width:"20em"}),created(){c.$on("change-kdb",()=>{this.getMetric()})},mounted(){this.getMetric()},methods:{getMetric:function(){this.options=[];this.$util.axios.get(this.$kdb.url+"/api/v1/metricnames").then(e=>{for(var t=null,a=0;t=e.data.results[a++];)t.length>20&&(this.width=t.length+"em"),this.options.push({label:t,value:t});console.log(this.options)},e=>{})},change:function(){this.$emit("message",this.input)}}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form-item",{attrs:{label:"Metric","label-width":"120px"}},[a("el-select",{style:{width:e.width},attrs:{size:"small",filterable:"",placeholder:"请选择"},on:{change:e.change},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)},staticRenderFns:[]};var d=a("VU/8")(u,h,!1,function(e){a("PmuS")},"data-v-598b6e59",null).exports,m={name:"date-picker",data:()=>({pickerOptions:{shortcuts:[{text:"最近一周",onClick(e){const t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick(e){const t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick(e){const t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},dateValue:""}),methods:{change:function(){this.$emit("message",this.dateValue)}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form-item",{attrs:{label:"Date","label-width":"120px"}},[a("el-date-picker",{attrs:{size:"small",type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},on:{change:e.change},model:{value:e.dateValue,callback:function(t){e.dateValue=t},expression:"dateValue"}})],1)},staticRenderFns:[]};var g=a("VU/8")(m,p,!1,function(e){a("9MTr")},"data-v-b0b95c32",null).exports,f=a("sJst"),b=a.n(f),v={props:{type:{type:String,default:"xls"},data:{type:Array,required:!0},fields:{type:Object,required:!0},title:{default:null},name:{type:String,default:"data.xls"},meta:{type:Array,default:()=>[]}},computed:{idName:function(){return"export_"+(new Date).getTime()}},methods:{generate(){if(!this.data.length)return;let e=this.getProcessedJson(this.data,this.fields);return"csv"==this.type?this.export(this.jsonToCSV(e),this.name,"application/csv"):this.export(this.jsonToXLS(e),this.name,"application/vnd.ms-excel")},export:function(e,t,a){let s=this.base64ToBlob(e,a);b()(s,t,a)},jsonToXLS:function(e){let t="<thead><tr>";if(null!=this.title)if(Array.isArray(this.title))for(var a=0;a<this.title.length;a++)t+='<th colspan="'+Object.keys(e[0]).length+'">'+this.title[a]+"<th></tr><tr>";else t+='<th colspan="'+Object.keys(e[0]).length+'">'+this.title+"<th></tr><tr>";for(let a in e[0])t+="<th>"+a+"</th>";return t+="</tr></thead>",t+="<tbody>",e.map(function(e,a){t+="<tbody><tr>";for(let a in e)t+="<td>"+e[a]+"</td>";t+="</tr></tbody>"}),'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table>${table}</table></body></html>'.replace("${table}",t)},jsonToCSV:function(e){var t="";if(null!=this.title)if(Array.isArray(this.title))for(var a=0;a<this.title.length;a++)t+=this.title[a]+"\r\n";else t+=this.title+"\r\n";for(let a in e[0])t+=a+",";return t=t.slice(0,t.length-1),t+="\r\n",e.map(function(e){for(let a in e){let s=e[a]+"";s.match(/[,"\n]/)&&(s='"'+s.replace(/\"/g,'""')+'"'),t+=s+","}t=t.slice(0,t.length-1),t+="\r\n"}),t},getProcessedJson:function(e,t){let a=this.getKeys(e,t),s=[],n=this;return e.map(function(e,t){let i={};for(let t in a){let s=a[t];i[t]=n.getNestedData(s,e)}s.push(i)}),s},getKeys:function(e,t){if(t)return t;let a={};for(let t in e[0])a[t]=t;return a},callItemCallback:function(e,t){return"object"==typeof e&&"function"==typeof e.callback?e.callback(t):t},getNestedData:function(e,t){let a=null,s=("object"==typeof e?e.field:e).split(".");a=t[s[0]];for(let e=1;e<s.length;e++)a=a[s[e]];return a=this.callItemCallback(e,a)},base64ToBlob:function(e,t){let a=window.btoa(window.unescape(encodeURIComponent(e))),s=atob(a),n=s.length,i=new Uint8ClampedArray(n);for(;n--;)i[n]=s.charCodeAt(n);return new Blob([i],{type:t})}}},j={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{attrs:{id:this.idName},on:{click:this.generate}},[this._t("default",[this._v("\n\t\tDownload "+this._s(this.name)+"\n\t")])],2)},staticRenderFns:[]},y={name:"table",components:{"download-excel":a("VU/8")(v,j,!1,null,null,null).exports},props:["columns","data","tags","metric"],data:()=>({tableData:[],dataEnd:[],currentPage:1,pagesize:100,filterText:"",excel:{json_fields:{"Complete name":"name"},json_data:[{name:"Tony Peña"},{name:"Thessaloniki"}],json_meta:[[{key:"charset",value:"utf-8"}]]}}),computed:{excelFileds:function(){let e={};return this.tags.forEach(t=>{e[t]=t}),e.date="date",e.value="value",e}},created(){c.$on("table-data-change",e=>{this.tableData=e,this.doFilter()})},mounted(){},methods:{doFilter:function(){0===this.filterText.length?this.dataEnd=this.tableData:(this.dataEnd=[],this.tableData.forEach((e,t)=>{let a=!1;for(let t in e)if(e[t]&&(e[t]+"").indexOf(this.filterText)>=0){a=!0;break}a&&(e.index=t,this.dataEnd.push(e))}),this.currentPage=1)},alter:function(e){e.editFlag=!1;let t={};this.tags.forEach(a=>{t[a]=e[a]});let a=[{name:this.metric,datapoints:[[e.time,e.value]],tags:t}];this.$util.axios.post(this.$kdb.url+"/api/v1/datapoints",a).then(e=>{this.loading=!1,this.$message({message:"修改成功",type:"success"})},e=>{this.loading=!1,this.$message.error("修改失败")})},handleSizeChange:function(e){this.pagesize=e},handleCurrentChange:function(e){this.currentPage=e},handleDelete:function(e,t){let a={},s={};this.tags.forEach(e=>{s[e]=t[e]}),a.metrics=[],a.metrics.push({tags:s,name:this.metric}),a.plugins=[],a.cache_time=0,a.start_absolute=t.time,a.end_absolute=t.time,this.$util.axios.post(this.$kdb.url+"/api/v1/datapoints/delete",a).then(a=>{this.loading=!1,this.$message({message:"删除成功",type:"success"}),this.dataEnd.splice(e,1),void 0!==t.index&&this.tableData.splice(t.index,1)},e=>{this.loading=!1,this.$message.error("删除失败")})}}},k={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{display:"flex","justify-content":"flex-start"}},[a("el-input",{staticClass:"search-input",staticStyle:{flex:"1","margin-right":"5px"},attrs:{size:"small",placeholder:"过滤",icon:"search"},on:{change:e.doFilter},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),e._v(" "),a("download-excel",{staticStyle:{"margin-right":"5px"},attrs:{data:e.dataEnd.slice((e.currentPage-1)*e.pagesize,e.currentPage*e.pagesize),fields:e.excelFileds,name:"data.xls"}},[a("el-button",{attrs:{type:"primary",size:"small"}},[e._v("导出当前页")])],1),e._v(" "),a("download-excel",{staticStyle:{"margin-right":"5px"},attrs:{data:e.dataEnd,fields:e.excelFileds,name:"data.xls"}},[a("el-button",{attrs:{type:"primary",size:"small"}},[e._v("导出所有")])],1)],1),e._v(" "),a("el-table",{attrs:{data:e.dataEnd.slice((e.currentPage-1)*e.pagesize,e.currentPage*e.pagesize),border:"",stripe:"",height:"600",fit:"",size:"small",cellpadding:"2"}},[e._l(e.columns,function(e,t){return a("el-table-column",{key:t,attrs:{prop:e.key,label:e.name,sortable:"","show-overflow-tooltip":""}})}),e._v(" "),a("el-table-column",{attrs:{label:"date",prop:"date",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"value",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{on:{dblclick:function(e){t.row.editFlag=!0}}},[a("span",{directives:[{name:"show",rawName:"v-show",value:!t.row.editFlag,expression:"!scope.row.editFlag"}]},[e._v(e._s(t.row.value))]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.row.editFlag,expression:"scope.row.editFlag"}]},[a("el-input",{nativeOn:{keyup:function(a){if(!("button"in a)&&e._k(a.keyCode,"enter",13,a.key,"Enter"))return null;e.alter(t.row)}},model:{value:t.row.value,callback:function(a){e.$set(t.row,"value",a)},expression:"scope.row.value"}})],1)])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],2),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[100,500,1e3,2e3,4e3,5e3,1e4,5e4],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.dataEnd.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},staticRenderFns:[]};var x=a("VU/8")(y,k,!1,function(e){a("AJay")},"data-v-37138960",null).exports,w={name:"groupBy",props:["metricName"],data:()=>({options:[],input:"",width:"20em",groupType:"tags"}),mounted(){},watch:{metricName(e){this.getTags(e)}},methods:{getTags:function(e){this.options.length=0;let t=20;this.input=[];var a={metrics:[{tags:{},name:e}],plugins:[],cache_time:0,start_absolute:0};this.$util.axios.post(this.$kdb.url+"/api/v1/datapoints/query/tags",a).then(e=>{var a=e.data.queries[0].results[0].tags;for(var s in a)t+=s.length,this.options.push({label:s,value:s}),this.input.push(s);this.width=t+"em",console.log(this.options),c.$emit("change-tags",[this.options,a]),c.$emit("changeGroupBy",this.input)},e=>{})},change:function(){c.$emit("changeGroupBy",this.input)},chooseAll:function(){this.input=this.options.map(e=>e.value),c.$emit("changeGroupBy",this.input)},clear:function(){this.input=[],c.$emit("changeGroupBy",this.input)}}},_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form-item",{attrs:{label:"Group By"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择",size:"small"},model:{value:e.groupType,callback:function(t){e.groupType=t},expression:"groupType"}},[a("el-option",{attrs:{label:"Tags",value:"tags"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"Tags"}},[a("el-select",{style:{width:e.width},attrs:{size:"small",multiple:"",filterable:"",placeholder:"请选择"},on:{change:e.change},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"click全选/ctrl + click清空",placement:"top-start"}},[a("el-button",{attrs:{size:"small"},on:{click:[function(t){return"button"in t||!e._k(t.keyCode,"left",37,t.key,["Left","ArrowLeft"])?"button"in t&&0!==t.button?null:e.chooseAll(t):null},function(t){return t.ctrlKey?e.clear(t):null}]}},[e._v("\n                全选/清空\n            ")])],1)],1)],1)},staticRenderFns:[]};var T=a("VU/8")(w,_,!1,function(e){a("7GQ7")},"data-v-55853b98",null).exports,z={name:"Where",data:()=>({wheres:[],tags:[],tagsValue:{},currTagValues:[]}),mounted(){c.$on("change-tags",e=>{this.tags=e[0],this.tagsValue=e[1]})},methods:{deleteCurr:function(e){this.wheres.splice(e,1),c.$emit("change-where",this.wheres)},addWhere:function(){this.wheres.push({name:this.tags[0].value,value:""})},change:function(){c.$emit("change-where",this.wheres)},querySearch:function(e,t){t(e?this.currTagValues.filter(this.filter(e)):this.currTagValues)},filter:e=>t=>-1!==t.value.toLowerCase().indexOf(e.toLowerCase()),onFocus:function(e){this.currTagValues=[],this.tagsValue[e].forEach(e=>{this.currTagValues.push({value:e})})}}},$={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._v("\n\n    Where:\n    Tags\n\n\n    "),a("el-button",{attrs:{icon:"el-icon-plus",circle:"",size:"mini"},on:{click:e.addWhere}}),e._v(" "),e._l(e.wheres,function(t,s){return a("el-autocomplete",{key:s,staticStyle:{display:"block"},attrs:{"fetch-suggestions":e.querySearch,placeholder:"请输入内容"},on:{focus:function(a){e.onFocus(t.name)},change:e.change},model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"item.value"}},[a("el-select",{staticStyle:{width:"130px"},attrs:{slot:"prepend",placeholder:"请选择"},on:{change:e.change},slot:"prepend",model:{value:t.name,callback:function(a){e.$set(t,"name",a)},expression:"item.name"}},e._l(e.tags,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-button",{attrs:{slot:"append"},on:{click:function(t){e.deleteCurr(s)}},slot:"append"},[e._v("-")])],1)})],2)},staticRenderFns:[]};var V=a("VU/8")(z,$,!1,function(e){a("Qy6h")},"data-v-12e2091c",null).exports,E={name:"LinkInfo",data(){return{kdb:{url:this.$kdb.url},rdb:{url:this.$rdb.url}}},created(){},methods:{change:function(){this.$kdb.url=this.kdb.url,c.$emit("change-kdb")}}},D={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",[a("el-form-item",{attrs:{label:"kairosdb url"}},[a("el-input",{on:{change:e.change},model:{value:e.kdb.url,callback:function(t){e.$set(e.kdb,"url",t)},expression:"kdb.url"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"关系数据库 url"}},[a("el-input",{model:{value:e.rdb.url,callback:function(t){e.$set(e.rdb,"url",t)},expression:"rdb.url"}})],1)],1)},staticRenderFns:[]};var F=a("VU/8")(E,D,!1,function(e){a("HwxV")},"data-v-bae19e1c",null).exports,C={name:"insert",components:{metric:d,"date-picker":g},data:()=>({labelPosition:"right",totalTags:[],range:5,activeName:"addData",metricName:"",tags:{},datapoints:[],date:[],value:"40.3322",loading:!1,tagsValue:{},currTagValues:[],inputMetricName:"",dynamicTags:[],inputTagVisible:!1,inputTagValue:""}),created(){},methods:{updateMetric:function(e){this.metricName=e,this.getTags(e)},updateDate:function(e){this.date=e.map(e=>(e.setMilliseconds(0),e.getTime()))},getTags:function(e){this.totalTags=[];var t={metrics:[{tags:{},name:e}],plugins:[],cache_time:0,start_absolute:0};this.loading=!0,this.$util.axios.post(this.$kdb.url+"/api/v1/datapoints/query/tags",t).then(e=>{var t=e.data.queries[0].results[0].tags;for(var a in t)this.totalTags.push({label:a,name:a,value:""});this.tagsValue=t,this.loading=!1},e=>{this.loading=!1})},submit:function(){if(-1===this.value.indexOf("."))return void this.$message.warning("数据值必须为浮点数");this.clearParam();for(let e,t=0;e=this.totalTags[t++];)this.tags[e.name]=e.value;let e=this.date[0];for(;e<=this.date[1];)this.datapoints.push([e,parseFloat(this.value)]),e+=60*this.range*1e3;let t=[{name:this.metricName,tags:this.tags,datapoints:this.datapoints}];this.$util.axios.post(this.$kdb.url+"/api/v1/datapoints",t).then(e=>{console.log(e),e.status="",this.loading=!1,this.$message({message:"添加成功",type:"success"})},e=>{this.loading=!1,this.$message.error("添加失败")})},addMetric:function(){let e={};this.dynamicTags.forEach(t=>{e[t]="first"});let t=[{name:this.inputMetricName,datapoints:[[0,0]],tags:e}];this.$util.axios.post(this.$kdb.url+"/api/v1/datapoints",t).then(e=>{console.log(e),e.status="",this.loading=!1,this.$message({message:"添加成功",type:"success"})},e=>{this.loading=!1,this.$message.error("添加失败")})},clearParam:function(){this.tags={},this.datapoints=[]},handleClose(e){this.dynamicTags.splice(this.dynamicTags.indexOf(e),1)},showInput(){this.inputTagVisible=!0,this.$nextTick(e=>{this.$refs.saveTagInput.$refs.input.focus()})},handleInputConfirm(){let e=this.inputTagValue;e&&this.dynamicTags.push(e),this.inputTagVisible=!1,this.inputTagValue=""},querySearch:function(e,t){t(e?this.currTagValues.filter(this.filter(e)):this.currTagValues)},filter:e=>t=>-1!==t.value.toLowerCase().indexOf(e.toLowerCase()),onFocus:function(e){this.currTagValues=[],this.tagsValue[e].forEach(e=>{this.currTagValues.push({value:e})})}}},N={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-tabs",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{type:"card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"添加Metric",name:"addMetric"}},[a("div",{staticStyle:{display:"flex","justify-content":"center"}},[a("el-form",{attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{label:"Metric","label-width":"80px"}},[a("el-input",{attrs:{placeholder:"输入Metric名称"},model:{value:e.inputMetricName,callback:function(t){e.inputMetricName=t},expression:"inputMetricName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"Tags","label-width":"80px"}},[e._l(e.dynamicTags,function(t){return a("el-tag",{key:t,attrs:{closable:"","disable-transitions":!1},on:{close:function(a){e.handleClose(t)}}},[e._v("\n                        "+e._s(t)+"\n                    ")])}),e._v(" "),e.inputTagVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:e.handleInputConfirm},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleInputConfirm(t):null}},model:{value:e.inputTagValue,callback:function(t){e.inputTagValue=t},expression:"inputTagValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:e.showInput}},[e._v("+ New Tag")])],2),e._v(" "),a("el-form-item",{attrs:{"label-width":"80px"}},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.addMetric}},[e._v("Add")])],1)],1)],1)]),e._v(" "),a("el-tab-pane",{attrs:{label:"添加数据点",name:"addData"}},[a("div",{staticStyle:{display:"flex","justify-content":"center"}},[a("el-form",{attrs:{"label-position":"left"}},[a("metric",{on:{message:e.updateMetric}}),e._v(" "),e._l(e.totalTags,function(t,s){return a("el-form-item",{key:s,attrs:{label:t.label,"label-width":"120px"}},[a("el-autocomplete",{staticStyle:{width:"100%"},attrs:{"fetch-suggestions":e.querySearch},on:{focus:function(a){e.onFocus(t.name)}},model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"item.value"}})],1)}),e._v(" "),a("el-form-item",{attrs:{"label-width":"120px",label:"数据粒度/分钟"}},[a("el-input-number",{model:{value:e.range,callback:function(t){e.range=t},expression:"range"}})],1),e._v(" "),a("date-picker",{on:{message:e.updateDate}}),e._v(" "),a("el-form-item",{attrs:{label:"数据值","label-width":"120px"}},[a("el-input",{model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"120px"}},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.submit}},[e._v("submit")])],1)],2)],1)])],1)},staticRenderFns:[]};var S={name:"tabPane",components:{metric:d,"date-picker":g,"data-table":x,"group-by":T,where:V,"link-info":F,insert:a("VU/8")(C,N,!1,function(e){a("5YOq")},"data-v-c0b65f1c",null).exports},data:()=>({activeName:"urlInfo",metric:"",startDate:null,endDate:null,tableData:{columns:[],data:[],tags:[],metric:""},tags:[],where:{},loading:!1}),created(){},mounted(){c.$on("changeGroupBy",e=>{let t;this.tags=e,this.tableData.columns.length=0,this.tableData.data.length=0,this.pointTemplate={};for(let e=0;t=this.tags[e++];)this.tableData.columns.push({key:t,name:t}),this.pointTemplate[t]=""}),c.$on("change-where",e=>{let t;var a={};for(let s=0;t=e[s++];)void 0===a[t.name]&&(a[t.name]=[]),a[t.name].push(t.value);this.where=a})},methods:{handleClick(e,t){console.log(e,t)},updateMetric:function(e){console.log(e),this.metric=e},updateDate:function(e){console.log(e),this.startDate=e[0],this.endDate=e[1]},submit:function(){const e={},t=[];t.push({name:"tag",tags:this.tags}),e.metrics=[],e.metrics.push({tags:this.where,name:this.metric,group_by:t}),e.plugins=[],e.cache_time=0,this.startDate.setMilliseconds(0),this.endDate.setMilliseconds(0),e.start_absolute=this.startDate.getTime(),e.end_absolute=this.endDate.getTime(),this.loading=!0,this.$util.axios.post(this.$kdb.url+"/api/v1/datapoints/query",e).then(e=>{console.log(e);let t,a,s,n=e.data.queries[0].results,i=[];for(let e=0;t=n[e++];)if(Object.keys(t.tags).length===this.tags.length)for(let e=0;s=t.values[e++];){a={};for(let e in t.tags)a[e+""]=t.tags[e+""][0];a.date=this.$util.moment(new Date(s[0])).format("YYYY-MM-DD HH:mm:ss.SSS"),a.time=s[0],a.value=s[1],a.editFlag=!1,i.push(a)}this.tableData.data=i,this.tableData.metric=this.metric,this.tableData.tags=this.tags,c.$emit("table-data-change",i),this.loading=!1,this.activeName="queryResult"}).catch(function(e){console.log(e),this.loading=!1})}}},q={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-tabs",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{type:"card","element-loading-text":"拼命加载中"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"链接信息",name:"urlInfo"}},[a("link-info")],1),e._v(" "),a("el-tab-pane",{attrs:{label:"条件",name:"condition"}},[a("el-form",{attrs:{inline:!0,"label-position":"left"}},[a("metric",{on:{message:e.updateMetric}}),e._v(" "),a("date-picker",{on:{message:e.updateDate}}),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.submit}},[e._v("submit")])],1)],1),e._v(" "),a("el-form",{attrs:{inline:!0,"label-position":"left"}},[a("group-by",{attrs:{"metric-name":e.metric}})],1),e._v(" "),a("where")],1),e._v(" "),a("el-tab-pane",{attrs:{label:"结果",name:"queryResult"}},[a("data-table",e._b({},"data-table",e.tableData,!1))],1),e._v(" "),a("el-tab-pane",{attrs:{label:"添加",name:"insert"}},[a("insert")],1)],1)},staticRenderFns:[]};var M={components:{"tab-pane":a("VU/8")(S,q,!1,function(e){a("9FWu")},"data-v-4e963cf5",null).exports},data:()=>({}),mounted(){},methods:{}},P={render:function(){var e=this.$createElement,t=this._self._c||e;return t("el-container",[t("el-header",{attrs:{height:"30px"}},[this._v("kclient")]),this._v(" "),t("el-container",[t("el-main",[t("tab-pane")],1)],1)],1)},staticRenderFns:[]},O=a("VU/8")(M,P,!1,null,null,null).exports;s.default.use(o.a);var R=new o.a({routes:[{path:"/",name:"Index",component:O}]}),U=a("PJh5"),W=a.n(U),I=a("mtWM"),B=a.n(I),L={moment:W.a,axios:B.a};s.default.prototype.$kdb={url:"http://192.168.13.110:8080"},s.default.prototype.$rdb={url:""},s.default.prototype.$util=L,s.default.config.productionTip=!1,s.default.use(i.a),new s.default({el:"#app",router:R,components:{App:r},template:"<App/>"})},PmuS:function(e,t){},Qy6h:function(e,t){},gsu9:function(e,t){},tvR6:function(e,t){},uslO:function(e,t,a){var s={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function n(e){return a(i(e))}function i(e){var t=s[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}n.keys=function(){return Object.keys(s)},n.resolve=i,e.exports=n,n.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.d2328decaa6b1c0ce4e4.js.map