"use client";
import { CaseSensitive } from "lucide-react";
import { ToolTemplate } from "./ToolTemplate";
import { useCanvasStore } from "@/stores/canvas-store";
import { Textbox } from "fabric";
import { Button } from "../../ui/button";
import { useState } from "react";

export const FontFamilyTool = () => {
  const fontFamilies = [
    "Arial",
    "Georgia",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Comic Sans MS",
  ];

  const [value, setValue] = useState<string>();
  const { canvas, getSelectedObject } = useCanvasStore();
  const onFontChange = (value: string) => {
    setValue(value);
    if (!canvas) return;
    const obj = getSelectedObject();
    if (obj && obj.type === "textbox") {
      const textbox = obj as Textbox;
      textbox.set("fontFamily", value);
      canvas.requestRenderAll();
    }
  };
  const onClickHandler = () => {
    return null;
  };
  return (
    <div className="flex gap-2 items-center">
      <ToolTemplate
        key="font-family"
        name="Font Family"
        Icon={CaseSensitive}
        onClickHandler={onClickHandler}
      />
      <div className="flex flex-wrap gap-1">
        {fontFamilies.map((val) => (
          <Button
            value={val}
            key={val}
            onClick={() => onFontChange(val)}
            variant={value === val ? "default" : "ghost"}
            className={`p-2 text-xs transition-all hover:scale-105 bg-gray-200 font-semibold hover:bg-white ${
              value === val ? "bg-amber-100 shadow-md" : "bg-gray-200"
            }`}
            style={{ fontFamily: val }}
          >
            {val}
          </Button>
        ))}
      </div>
    </div>
  );
};
