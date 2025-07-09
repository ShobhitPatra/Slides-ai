// import {
//   Edit3,
//   Type,
//   Palette,
//   CaseSensitive,
//   AlignLeft,
//   Move,
//   Trash2,
//   Plus,
//   Square,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { FontsizeTool } from "../tools/FontsizeTool";

import { BackgroundColorTool } from "../tools/BackgroundColorTool";
import { ObjectTools } from "../tools/ObjectTools";

import { TextTools } from "../tools/TextTools";
import { Separator } from "../ui/separator";

// export const Toolbar = ({ canvasBackground }: { canvasBackground: string }) => {
//   const tools = [
//     {
//       id: "text-editor",
//       name: "Text Editor",
//       icon: Edit3,
//       description: "Edit text content of selected object",
//     },
//     {
//       id: "font-size",
//       name: "Font Size",
//       icon: Type,
//       description: "Increase/decrease font size",
//     },
//     {
//       id: "text-color",
//       name: "Text Color",
//       icon: Palette,
//       description: "Pick text color",
//     },
//     {
//       id: "font-family",
//       name: "Font Family",
//       icon: CaseSensitive,
//       description: "Select from common fonts",
//     },
//     {
//       id: "text-align",
//       name: "Text Align",
//       icon: AlignLeft,
//       description: "Align text left, center, or right",
//     },
//     {
//       id: "move",
//       name: "Move ",
//       icon: Move,
//       description: "Drag to reposition text or objects",
//     },
//     {
//       id: "delete",
//       name: "Delete",
//       icon: Trash2,
//       description: "Delete selected object",
//     },
//     {
//       id: "add-textbox",
//       name: "Add Textbox",
//       icon: Plus,
//       description: "Add a new editable textbox",
//     },
//     {
//       id: "add-shape",
//       name: "Add Shape",
//       icon: Square,
//       description: "Add rectangle, circle, or line",
//     },
//   ];

//   const backgroundColors = [
//     "#ffffff",
//     "#f8f9fa",
//     "#e9ecef",
//     "#dee2e6",
//     "#ffeaa7",
//     "#fab1a0",
//     "#fd79a8",
//     "#e17055",
//     "#81ecec",
//     "#74b9ff",
//     "#a29bfe",
//     "#6c5ce7",
//   ];

//   return (
//     <div className="md:w-1/4 md:h-8/10 m-4 rounded-md bg-slate-900  border-r border-b border-slate-800 flex flex-col shadow-sm py-4 ">
//       <div className="flex-1 overflow-y-auto p-4 space-y-5">
//         {/* Text Tools */}
//         <FontsizeTool />
//         <div>
//           <div className="grid grid-cols-2 gap-2">
//             {tools.slice(0, 5).map((tool) => {
//               const Icon = tool.icon;
//               return (
//                 <Button
//                   key={tool.id}
//                   // variant={selectedTool === tool.id ? "default" : "outline"}
//                   size="sm"
//                   // onClick={() => onToolSelect(tool.id)}
//                   className="h-12 flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 bg-gray-200"
//                   title={tool.description}
//                 >
//                   <Icon className="h-4 w-4  " />
//                   <span className="text-xs">{tool.name}</span>
//                 </Button>
//               );
//             })}
//           </div>
//         </div>

//         <Separator className=" bg-gray-600" />

//         {/* Object Tools */}
//         <div>
//           <div className="grid grid-cols-2 gap-2">
//             {tools.slice(5, 9).map((tool) => {
//               const Icon = tool.icon;
//               return (
//                 <Button
//                   key={tool.id}
//                   // variant={selectedTool === tool.id ? "default" : "outline"}
//                   size="sm"
//                   // onClick={() => onToolSelect(tool.id)}
//                   className="h-12 flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 bg-gray-300"
//                   title={tool.description}
//                 >
//                   <Icon className="h-4 w-4 " />
//                   <span className="text-xs">{tool.name}</span>
//                 </Button>
//               );
//             })}
//           </div>
//         </div>

//         <Separator className="bg-gray-600" />

//         {/* Background Tools */}
//         <div>
//           <div className="grid grid-cols-4 gap-2">
//             {backgroundColors.map((color) => (
//               <button
//                 key={color}
//                 // onClick={() => onBackgroundChange(color)}
//                 className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
//                   canvasBackground === color
//                     ? "border-gray-800 shadow-md"
//                     : "border-gray-200"
//                 }`}
//                 style={{ backgroundColor: color }}
//                 title={`Set background to ${color}`}
//               />
//             ))}
//           </div>
//           {/* color slider  */}
//           <div className="mt-3">
//             <input
//               type="color"
//               value={canvasBackground}
//               // onChange={(e) => onBackgroundChange(e.target.value)}
//               className="w-full h-8 rounded border border-gray-200 cursor-pointer"
//               title="Custom background color"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
export const Toolbar = () => {
  return (
    <div className="flex flex-wrap flex-col gap-4 py-4 px-2  md:w-1/4 md:h-8/10 m-4 rounded-md bg-slate-900  border-r border-b border-slate-800 shadow-sm ">
      <TextTools />
      <Separator className="bg-gray-600" />
      <BackgroundColorTool />
      <Separator className="bg-gray-600" />
      <ObjectTools />
    </div>
  );
};
