import { AddShapeTool } from "./tools-object/AddShapeTool";
import { AddTextBoxTool } from "./tools-object/AddTextBoxTool";
import { DeleteTool } from "./tools-object/DeleteTool";

export const ObjectTools = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <AddShapeTool />
      <AddTextBoxTool />
      <DeleteTool />
    </div>
  );
};
