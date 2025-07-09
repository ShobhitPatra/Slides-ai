"use client";
import { useCanvasStore } from "@/stores/canvas-store";
import { ToolTemplate } from "../tools-text/ToolTemplate";
import {
  CircleIcon,
  Plus,
  RectangleHorizontal,
  TriangleIcon,
} from "lucide-react";
import { useState } from "react";
import { Circle, Rect, Triangle } from "fabric";
export const AddShapeTool = () => {
  const { canvas } = useCanvasStore();
  const [selectedShape, setSelectedShape] = useState<string>();
  const shapes = [
    { name: "Rectangle", icon: RectangleHorizontal },
    { name: "Circle", icon: CircleIcon },
    { name: "Triangle", icon: TriangleIcon },
  ];
  const onAddShape = (shape: string) => {
    if (!canvas) return;
    setSelectedShape(shape);
    let newShape;
    switch (shape) {
      case "Rectangle":
        newShape = new Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 60,
          fill: "#3498db",
        });
        break;
      case "Circle":
        newShape = new Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: "#3498db",
        });
        break;
      case "Triangle":
        newShape = new Triangle({
          left: 100,
          top: 100,
          width: 100,
          height: 60,
          fill: "#3498db",
        });
        break;
      default:
        return;
    }
    console.log(selectedShape);
    canvas.add(newShape);
    canvas.requestRenderAll();
  };
  const onclick = () => {
    return null;
  };
  return (
    <div className="flex gap-2 items-center">
      <ToolTemplate
        Icon={Plus}
        key="add-shape"
        name="Add Shape"
        onClickHandler={onclick}
      />
      <div className="flex flex-wrap  gap-1">
        {" "}
        {shapes.map((shape) => (
          <ToolTemplate
            key={shape.name}
            name={shape.name}
            Icon={shape.icon}
            onClickHandler={() => onAddShape(shape.name)}
          />
        ))}
      </div>
    </div>
  );
};
