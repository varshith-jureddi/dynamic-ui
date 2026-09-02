import type { InputFormat } from "@/lib/input/loader";
import type { UISpec } from "@/lib/validation/ui-schema";

const skillSets = {
  "dashboard-demo.json": ["dashboard","kpi","analytics","visualization"],
  "sales-dashboard.json": ["dashboard","kpi","analytics","visualization","table"],
  "project-dashboard.json": ["dashboard","kpi","operations","timeline","visualization"],
  "operations-dashboard.json": ["dashboard","kpi","operations","analytics","visualization"]
};

export function createDemoEnvelope(filename: string, format: InputFormat, raw: string) {
  if (filename === "dashboard-demo.json") return business(raw, 0);
  if (filename === "sales-dashboard.json") return business(raw, 1);
  if (filename === "project-dashboard.json") return project(raw);
  if (filename === "operations-dashboard.json") return operations(raw);

  // Legacy fixtures remain usable for architecture testing.
  if (filename === "dashboard.json") return business(raw, 0);
  if (filename === "project-status.json") return project(raw);
  if (filename === "nested-demo.json") {
    const d=JSON.parse(raw); const ui:UISpec={type:"page",title:d.title,description:d.summary,layout:"dashboard",children:[{type:"statGrid",children:d.tabs[0].metrics.map((m:any)=>({type:"metric",title:m.title,value:m.value}))},{type:"card",title:"Workstreams",children:[{type:"list",items:d.tabs[1].items}]}]};
    return {title:d.title,selectedSkills:["dashboard","article"],reasoning:"The content has grouped metrics and workstream details, so the demo uses a compact KPI summary and supporting detail card.",ui};
  }

  const children:UISpec["children"]=[];
  for(const line of raw.split(/\r?\n/)){
    if(/^### /.test(line)) children.push({type:"heading",level:3,text:line.slice(4)});
    else if(/^## /.test(line)) children.push({type:"heading",level:2,text:line.slice(3)});
    else if(/^# /.test(line)) children.push({type:"heading",level:1,text:line.slice(2)});
    else if(/^- /.test(line)){const last=children[children.length-1]; if(last?.type==="list") last.items.push(line.slice(2)); else children.push({type:"list",items:[line.slice(2)]});}
    else if(line.trim()) children.push({type:"text",text:line.trim()});
  }
  return {title:filename,selectedSkills:filename==="timeline.md"?["article","timeline"]:["article"],reasoning:"The content is primarily prose, headings, and lists, so an editorial interface is appropriate.",ui:{type:"page",title:filename,layout:"article",children} satisfies UISpec};
}

function metric(title:string,value:string|number,trend:string,direction:"up"|"down"|"neutral",comparison="vs previous period"){return {type:"metric" as const,title,value,trend,trendDirection:direction,comparison};}
function business(raw:string, variant:number){
 const d=JSON.parse(raw); const k=d.kpis;
 const ui:UISpec={type:"page",title:d.dashboard?.title||d.title,description:d.dashboard?.period?`${d.dashboard.period} · performance overview`:`${d.period} · performance overview`,layout:"dashboard",children:[
  {type:"statGrid",children:[metric("Revenue",typeof k.revenue==="object"?k.revenue.value:k.revenue,"18%","up"),metric("Customers",typeof k.customers==="object"?k.customers.value:k.customers,"9%","up"),metric("Conversion",typeof k.conversionRate==="object"?k.conversionRate.value:k.conversionRate,"18%","up"),metric("Orders",typeof k.orders==="object"?k.orders.value:k.orders,"14%","up")]},
  {type:"section",title:"Performance",layout:"twoColumn",children:[{type:"chart",chartType:variant?"line":"area",title:"Revenue trend",data:d.revenueTrend||d.monthlyRevenue||[]},{type:"chart",chartType:"donut",title:"Customer segments",data:d.customerSegments||[{name:"Organic",value:46},{name:"Paid",value:39},{name:"Partner",value:40}]}]},
  {type:"section",title:"Details",children:[{type:"table",title:"Top customers",columns:["Customer","Revenue","Growth","Status"],rows:(d.topCustomers||d.channels||[]).map((x:any)=>variant? [x.name,x.revenue,x.growth,x.status]:[x.Channel,x.Revenue,"—","Active"])},{type:"activityFeed",title:"Recent activity",items:d.activities||[{title:"Revenue trend updated",description:"Latest performance data is available.",timestamp:"Today"}]}]},
  {type:"insight",variant:"success",title:"AI Insight",description: variant?"Sales performance is being presented with trend, customer detail, and status context from the supplied dataset.":"Revenue and conversion are trending upward compared with the previous period."}
 ]};
 return {title:ui.title,selectedSkills:skillSets[variant?"sales-dashboard.json":"dashboard-demo.json"],reasoning:"The dataset contains headline KPIs, time-series performance, categorical segments, detailed records, and recent activity. The generated layout prioritizes summary, trends, detail, and an evidence-based insight.",ui};
}
function project(raw:string){const d=JSON.parse(raw); const ui:UISpec={type:"page",title:d.project,description:`${d.status} · ${d.overallProgress}% complete`,layout:"dashboard",children:[{type:"statGrid",children:[metric("Overall progress",`${d.overallProgress}%`,"8%","up"),{type:"status",label:d.status,variant:"success"},{type:"metric",title:"Workstreams",value:d.workstreams.length,description:"Tracked delivery areas"},{type:"metric",title:"Milestones",value:d.milestones.length,description:"Planned checkpoints"}]},{type:"section",title:"Delivery health",layout:"twoColumn",children:[{type:"progress",title:"Overall completion",value:d.overallProgress,max:100,description:"Current project completion"},{type:"chart",chartType:"bar",title:"Workstream progress",data:d.workstreams.map((x:any)=>({name:x.name,value:x.progress}))}]},{type:"section",title:"Milestones",children:[{type:"timeline",items:d.milestones}]},{type:"insight",variant:"info",title:"AI Insight",description:`The project is ${d.overallProgress}% complete with ${d.status.toLowerCase()} status across ${d.workstreams.length} workstreams.`}]}; return {title:d.project,selectedSkills:skillSets["project-dashboard.json"],reasoning:"The input combines progress, operational status, dated milestones, and workstream measurements. A delivery dashboard makes those relationships easy to scan.",ui};}
function operations(raw:string){const d=JSON.parse(raw); const ui:UISpec={type:"page",title:d.title,description:d.period,layout:"dashboard",children:[{type:"statGrid",children:[metric("Availability",`${d.kpis.availability}%`,"1.2%","up"),metric("Incidents",d.kpis.incidents,"18%","down"),metric("Response time",`${d.kpis.responseTime} min`,"12%","down"),{type:"status",label:d.kpis.health,variant:"success"}]},{type:"section",title:"Operational overview",layout:"twoColumn",children:[{type:"chart",chartType:"area",title:"Traffic volume",data:d.traffic},{type:"chart",chartType:"bar",title:"Incidents by service",data:d.services}]},{type:"activityFeed",title:"Recent activity",items:d.activities},{type:"insight",variant:"success",title:"Operational insight",description:"Availability remains strong while incident volume and response time are improving in the supplied period."}]}; return {title:d.title,selectedSkills:skillSets["operations-dashboard.json"],reasoning:"The dataset emphasizes operational health, service measurements, incidents, and recent events, so the interface prioritizes health KPIs, trends, service comparison, and activity.",ui};}
