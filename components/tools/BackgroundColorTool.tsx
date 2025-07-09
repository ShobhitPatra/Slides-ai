"use client";
import { Paintbrush2Icon } from "lucide-react";
import { ToolTemplate } from "./tools-text/ToolTemplate";
import { useCanvasStore } from "@/stores/canvas-store";

import { Button } from "../ui/button";
import { useState } from "react";

export const BackgroundColorTool = () => {
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
  const [bgColor, setBgColor] = useState<string>();
  const { canvas } = useCanvasStore();
  const onFontChange = (value: string) => {
    setBgColor(value);
    if (!canvas) return;

    canvas.backgroundColor = value;
    canvas.requestRenderAll();
  };
  const onClickHandler = () => {
    return null;
  };
  return (
    <div className="flex gap-2 items-center">
      <ToolTemplate
        key="bg-color"
        name="Bg Color"
        Icon={Paintbrush2Icon}
        onClickHandler={onClickHandler}
      />
      <div className="flex flex-wrap gap-2">
        {backgroundColors.map((color) => (
          <Button
            value={color}
            key={color}
            onClick={() => onFontChange(color)}
            className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
              color === bgColor
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
