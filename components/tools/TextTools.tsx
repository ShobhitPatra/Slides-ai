import { FontFamilyTool } from "./tools-text/FontfamilyTool";
import { FontsizeTool } from "./tools-text/FontsizeTool";
import { TextAlignTool } from "./tools-text/TextAlignTool";
import { TextcolorTool } from "./tools-text/TextColorTool";

export const TextTools = () => {
  return (
    <div className="flex flex-col flex-wrap gap-4">
      <FontsizeTool />
      <FontFamilyTool />
      <TextcolorTool />
      <TextAlignTool />
    </div>
  );
};
