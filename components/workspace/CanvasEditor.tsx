"use client";
import { useEffect, useRef, useCallback } from "react";
import { Slide } from "@/stores/interaction-store";
import { Canvas, Textbox } from "fabric";
import { useCanvasStore } from "@/stores/canvas-store";

interface CanvasEditorProps {
  slide: Slide;
}

export const CanvasEditor = ({ slide }: CanvasEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { setCanvas } = useCanvasStore();
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const currentSlideRef = useRef<string | null>(null);
  const isInitializedRef = useRef(false);

  // Render slide content to canvas
  const renderSlide = useCallback((canvas: Canvas, slideData: Slide) => {
    try {
      // Remove all objects first
      const objects = canvas.getObjects();
      objects.forEach((obj) => {
        try {
          canvas.remove(obj);
        } catch (e) {
          console.warn("Error removing object:", e);
        }
      });

      // Set background
      canvas.backgroundColor = "#fff";

      // Add title
      const title = new Textbox(slideData.title, {
        width: 600,
        height: 150,
        textAlign: "center",
        top: 50,
        left: 100,
        fontSize: 28,
        fontWeight: "bold",
        fill: "#1f2937",
      });
      canvas.add(title);

      // Add content
      if (slideData.content) {
        const content = new Textbox(slideData.content, {
          width: 600,
          top: 375,
          left: 100,
          fontSize: 18,
          fill: "#374151",
        });
        canvas.add(content);
      }

      // Add bullet points
      let topOffset = 170;
      const bulletPoints = Object.values(slideData.bulletPoints || {});

      bulletPoints.forEach((point) => {
        const bullet = new Textbox(`• ${point}`, {
          width: 600,
          top: topOffset,
          left: 100,
          fontSize: 20,
          fill: "#4b5563",
        });
        canvas.add(bullet);
        topOffset += 40;
      });

      // Render changes
      canvas.requestRenderAll();
    } catch (error) {
      console.error("Error rendering slide:", error);
    }
  }, []);

  // Initialize canvas
  const initializeCanvas = useCallback(() => {
    if (
      !canvasRef.current ||
      fabricCanvasRef.current ||
      isInitializedRef.current
    ) {
      return;
    }

    try {
      const canvas = new Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: "#fff",
      });

      fabricCanvasRef.current = canvas;
      isInitializedRef.current = true;
      setCanvas(canvas);

      // Set initial slide
      if (slide) {
        currentSlideRef.current = slide.slideNo;
        renderSlide(canvas, slide);
      }
    } catch (error) {
      console.error("Error initializing canvas:", error);
    }
  }, [setCanvas, slide, renderSlide]);

  // Initialize canvas on mount
  useEffect(() => {
    initializeCanvas();

    // Cleanup on unmount
    return () => {
      if (fabricCanvasRef.current) {
        try {
          fabricCanvasRef.current.dispose();
        } catch (error) {
          console.warn("Canvas disposal error:", error);
        } finally {
          fabricCanvasRef.current = null;
          isInitializedRef.current = false;
        }
      }
    };
  }, []);

  // Update canvas when slide changes
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !slide || !isInitializedRef.current) return;

    // Only re-render if slide actually changed
    if (currentSlideRef.current !== slide.slideNo) {
      currentSlideRef.current = slide.slideNo;

      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        if (fabricCanvasRef.current && isInitializedRef.current) {
          renderSlide(fabricCanvasRef.current, slide);
        }
      });
    }
  }, [slide, renderSlide]);

  return (
    <div ref={containerRef} className="canvas-container">
      <canvas
        ref={canvasRef}
        className="border shadow-lg rounded-lg"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};
