"use client";
import { useCanvasStore } from "@/stores/canvas-store";
import { ToolTemplate } from "../tools-text/ToolTemplate";
import { MapPlus } from "lucide-react";
import { Textbox } from "fabric";
export const AddTextBoxTool = () => {
  const { canvas } = useCanvasStore();
  const onAddTextBox = () => {
    if (!canvas) return;
    const textbox = new Textbox("New Text", {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 20,
      fill: "#000000",
    });
    canvas.add(textbox);
    canvas.renderAll();
  };
  return (
    <ToolTemplate
      Icon={MapPlus}
      key="add-textbox"
      name="Add Text"
      onClickHandler={onAddTextBox}
    />
  );
};
