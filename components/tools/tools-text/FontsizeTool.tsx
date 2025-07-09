"use client";
import { Edit3 } from "lucide-react";
import { ToolTemplate } from "./ToolTemplate";
import { useCanvasStore } from "@/stores/canvas-store";
import { Textbox } from "fabric";
import { Button } from "../../ui/button";
import { useState } from "react";

export const FontsizeTool = () => {
  const fontValues = [
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22,

    28, 30, 32, 40, 44, 48, 52,
  ];
  const [value, setValue] = useState<number>();
  const { canvas, getSelectedObject } = useCanvasStore();
  const onFontChange = (value: number) => {
    setValue(value);
    if (!canvas) return;
    const obj = getSelectedObject();
    if (obj && obj.type === "textbox") {
      const textbox = obj as Textbox;
      textbox.set("fontSize", value);
      canvas.requestRenderAll();
    }
  };
  const onClickHandler = () => {
    return null;
  };
  return (
    <div className="flex gap-2 items-center">
      <ToolTemplate
        key="font-size"
        name="Font Size"
        Icon={Edit3}
        onClickHandler={onClickHandler}
      />
      <div className="flex flex-wrap gap-1">
        {fontValues.map((val) => (
          <Button
            value={val}
            key={val}
            onClick={() => onFontChange(val)}
            className={`w-6 h-6 p-2 text-xs transition-all hover:scale-105 bg-gray-200 hover:bg-white ${
              value === val ? "bg-amber-100 shadow-md" : "bg-gray-200"
            }`}
          >
            {val}
          </Button>
        ))}
      </div>
    </div>
  );
};
