"use client";
import { useEffect, useRef, useState } from "react";
import { Slide } from "@/stores/interaction-store";
import { Canvas } from "fabric";
interface CanvasEditorProps {
  slide: Slide;
}

export const CanvasEditor = ({ slide }: CanvasEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCnavas = new Canvas(canvasRef.current, {});
      initCnavas.backgroundColor = "#fff";

      initCnavas.renderAll();
      setCanvas(initCnavas);
      return () => {
        initCnavas.dispose();
      };
    }
  }, [slide]);

  return <canvas ref={canvasRef} />;
};
