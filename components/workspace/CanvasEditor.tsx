"use client";
import { useEffect, useRef, useState } from "react";
import { Slide } from "@/stores/interaction-store";
import { Canvas, Textbox } from "fabric";
import { INTERACTION_EXAMPLE } from "@/examples/interaction-example";

const DUMMY_SLIDE = INTERACTION_EXAMPLE.Interactions[0].response[0];
interface CanvasEditorProps {
  slide: Slide;
}

export const CanvasEditor = ({ slide }: CanvasEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: "#fff",
      });
      // title
      const title = new Textbox(DUMMY_SLIDE.title, {
        width: 600,
        height: 150,
        textAlign: "center",
        top: 50,
        left: 100,
        fontSize: 28,
        fontWeight: "bold",
      });
      initCanvas.add(title);
      // content
      const content = new Textbox(DUMMY_SLIDE.content, {
        width: 600,
        top: 375,
        left: 100,
        fontSize: 18,
      });
      initCanvas.add(content);
      // bullet points
      let topOffset = 170;
      Object.values(DUMMY_SLIDE.bulletPoints).forEach((point) => {
        const bullet = new Textbox(`>${DUMMY_SLIDE.slideNo} ${point}`, {
          top: topOffset,
          width: 600,
          left: 100,
          fontWeight: "",
          fontSize: 20,
        });
        initCanvas.add(bullet);
        topOffset += 40;
      });

      initCanvas.renderAll();
      setCanvas(initCanvas);
      return () => {
        initCanvas.dispose();
      };
    }
  }, [slide]);

  return <canvas ref={canvasRef} />;
};
