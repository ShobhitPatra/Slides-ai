"use client";
import { Droplet } from "lucide-react";
import { ToolTemplate } from "./ToolTemplate";
import { useCanvasStore } from "@/stores/canvas-store";
import { Textbox } from "fabric";
import { Button } from "../../ui/button";
import { useState } from "react";

export const TextcolorTool = () => {
  const backgroundColors = [
    "#ffffff",
    "#f8f9fa",
    "#e9ecef",
    "#dee2e6",
    "#ffeaa7",
    "#fab1a0",
    "#fd79a8",
    "#e17055",
    "#81ecec",
    "#74b9ff",
    "#a29bfe",
    "#000000",
  ];
  const [textColor, setTextColor] = useState<string>();
  const { canvas, getSelectedObject } = useCanvasStore();
  const onFontChange = (value: string) => {
    setTextColor(value);
    if (!canvas) return;
    const obj = getSelectedObject();
    if (obj && obj.type === "textbox") {
      const textbox = obj as Textbox;
      textbox.set("fill", value);
      canvas.requestRenderAll();
    }
  };
  const onClickHandler = () => {
    return null;
  };
  return (
    <div className="flex gap-2 items-center">
      <ToolTemplate
        key="text-color"
        name="Text Color"
        Icon={Droplet}
        onClickHandler={onClickHandler}
      />
      <div className="flex flex-wrap gap-1">
        {backgroundColors.map((color) => (
          <Button
            value={color}
            key={color}
            onClick={() => onFontChange(color)}
            className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
              color === textColor
                ? "border-gray-800 shadow-md"
                : "border-gray-200"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};
