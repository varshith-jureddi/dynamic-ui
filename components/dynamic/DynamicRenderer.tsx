import type { ReactNode } from "react";
import type { UIComponent, UISpec } from "@/lib/validation/ui-schema";
import { componentRegistry, isRegisteredComponent } from "./ComponentRegistry";
import Tabs from "@/components/ui/Tabs";
function UnsupportedComponent({type}:{type:string}){return <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">Unsupported component: <code>{type}</code></div>}
function RenderNode({node,path="root"}:{node:UIComponent;path?:string}):ReactNode{
 if(!isRegisteredComponent(node.type)) return <UnsupportedComponent type={node.type}/>;
 if(node.type==="tabs") return <Tabs tabs={node.tabs.map((tab,ti)=>({label:tab.label,children:<div className="space-y-4">{tab.children.map((child,ci)=><RenderNode key={`${path}.tabs.${ti}.${ci}`} node={child} path={`${path}.tabs.${ti}.${ci}`}/>)}</div>}))} render={x=>x}/>;
 const Component=componentRegistry[node.type];
 if("children" in node) return <Component {...node} children={node.children.map((child,i)=><RenderNode key={`${path}.${node.type}.${i}`} node={child} path={`${path}.${node.type}.${i}`}/>)}/>;
 return <Component {...node}/>;
}
export default function DynamicRenderer({spec}:{spec:UISpec}){return <RenderNode node={spec as UIComponent} path="page"/>}
