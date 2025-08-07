"use client";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { ToolTemplate } from "./ToolTemplate";
import { useCanvasStore } from "@/stores/canvas-store";
import { useState } from "react";
import { Textbox } from "fabric";

export const TextAlignTool = () => {
  const alignOptions = [
    {
      id: "left",
      name: "Align Left",
      icon: AlignLeft,
    },
    {
      id: "center",
      name: "Align Center",
      icon: AlignCenter,
    },
    {
      id: "right",
      name: "Align Right",
      icon: AlignRight,
    },
  ];
  const [align, setAlign] = useState<string>("center");
  const { canvas, getSelectedObject } = useCanvasStore();
  console.log(align);
  const handleAlign = (align: string) => {
    setAlign(align);
    if (!canvas) return;
    const obj = getSelectedObject();
    if (obj && obj.type == "textbox") {
      const textbox = obj as Textbox;
      textbox.set("textAlign", align);
      canvas.requestRenderAll();
    }
  };
  return (
    <div className="flex gap-2 flex-wrap">
      {alignOptions.map((align) => (
        <ToolTemplate
          name={align.name}
          key={align.id}
          Icon={align.icon}
          onClickHandler={() => handleAlign(align.id)}
        />
      ))}
    </div>
  );
};
