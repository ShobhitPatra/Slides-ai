import { BackgroundColorTool } from "../tools/BackgroundColorTool";
import { ObjectTools } from "../tools/ObjectTools";
import { TextTools } from "../tools/TextTools";
import { Separator } from "../ui/separator";
import { ChatInputBox } from "./ChatInputBox";

export const Toolbar = () => {
  return (
    <div className="flex flex-wrap flex-col gap-4 py-4 px-2  md:w-1/4 md:h-8/10 m-4 rounded-md bg-slate-900 border-white shadow-sm ">
      <TextTools />
      <Separator className="bg-gray-600" />
      <BackgroundColorTool />
      <Separator className="bg-gray-600" />
      <ObjectTools />
      <Separator className="bg-gray-600" />

      <ChatInputBox />
    </div>
  );
};
