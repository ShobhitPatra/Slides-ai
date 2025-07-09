"use client";
import { useCanvasStore } from "@/stores/canvas-store";
import { ToolTemplate } from "../tools-text/ToolTemplate";
import { Trash2Icon } from "lucide-react";
export const DeleteTool = () => {
  const { canvas, getSelectedObject } = useCanvasStore();

  const onDelete = () => {
    if (!canvas) return null;
    const obj = getSelectedObject();
    if (obj) {
      canvas.remove(obj);
      canvas.requestRenderAll();
    }
  };
  return (
    <ToolTemplate
      Icon={Trash2Icon}
      key="delete-shape"
      name="Remove"
      onClickHandler={onDelete}
    />
  );
};
