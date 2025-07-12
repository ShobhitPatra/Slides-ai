"use client";
import { useEffect, useRef, useCallback } from "react";
import { Canvas, Textbox } from "fabric";
import { useCanvasStore } from "@/stores/canvas-store";
import { Slide } from "@/app/generated/prisma";
import { useInteractionStore } from "@/stores/interaction-store";

export const CanvasEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { saveCanvasToSlide, currentSlideIndex, slides } =
    useInteractionStore();
  const { setCanvas } = useCanvasStore();
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const currentSlideRef = useRef<string | null>(null);

  // Get current slide from store
  const slide = slides?.[currentSlideIndex] || null;

  // Render slide content to canvas
  const renderSlide = useCallback((canvas: Canvas, slideData: Slide) => {
    try {
      console.log(
        "Rendering slide:",
        slideData.slideNo,
        "Title:",
        slideData.title
      );

      canvas.clear();
      canvas.backgroundColor = "#fff";

      // title
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
      console.log("Added title:", slideData.title);

      // content
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

      // bullet points
      let topOffset = 170;
      const bulletPoints = Object.values(slideData.bulletPoints || {});
      bulletPoints.forEach((point, index) => {
        const bullet = new Textbox(`• ${point}`, {
          width: 600,
          top: topOffset,
          left: 100,
          fontSize: 20,
          fill: "#4b5563",
        });
        canvas.add(bullet);
        console.log(`Added bullet ${index + 1}:`, point);
        topOffset += 40;
      });

      canvas.renderAll();
      console.log("canvas rendered successfully");
    } catch (error) {
      console.error("Error rendering slide:", error);
    }
  }, []);

  // Initializing canvas
  useEffect(() => {
    if (!canvasRef.current || fabricCanvasRef.current) {
      return;
    }

    try {
      const canvas = new Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: "#fff",
      });

      fabricCanvasRef.current = canvas;
      setCanvas(canvas);

      console.log("Canvas initialized");
    } catch (error) {
      console.error("Error initializing canvas:", error);
    }

    // Cleanup
    return () => {
      if (fabricCanvasRef.current) {
        try {
          fabricCanvasRef.current.dispose();
        } catch (error) {
          console.warn("Canvas disposal error:", error);
        }
        fabricCanvasRef.current = null;
      }
    };
  }, [setCanvas]); // Empty dependency array to run only once

  // Handle slide changes (runs when currentSlideIndex changes)
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !slide) return;

    const newSlideNo = slide.slideNo.toString();
    const previousSlideNo = currentSlideRef.current;

    console.log(
      `Previous slide: ${previousSlideNo}, Current slide: ${newSlideNo}, SlideIndex: ${currentSlideIndex}`
    );

    // Check if this is a different slide
    if (previousSlideNo !== null && previousSlideNo !== newSlideNo) {
      // Save previous slide before switching
      const previousSlideIndex = parseInt(previousSlideNo) - 1; // Convert slideNo to index
      console.log(
        "Saving canvas for slide:",
        previousSlideNo,
        "at index:",
        previousSlideIndex
      );
      try {
        const canvasJson = canvas.toJSON();
        saveCanvasToSlide(previousSlideIndex, canvasJson);
      } catch (error) {
        console.error("Error saving canvas:", error);
      }
    }

    // Update current slide reference
    currentSlideRef.current = newSlideNo;

    // Load new slide content (only if actually changing slides)
    if (previousSlideNo !== newSlideNo) {
      const json = slide.canvasJson;
      console.log(`Loading slide ${newSlideNo}, has saved JSON: ${!!json}`);

      if (json && typeof json === "object" && !Array.isArray(json)) {
        console.log("Loading saved canvas for slide:", newSlideNo);
        console.log("Canvas JSON:", json);

        canvas.loadFromJSON(json, () => {
          console.log(
            "Canvas loaded from JSON, objects count:",
            canvas.getObjects().length
          );
          canvas.renderAll();

          // Force a re-render after a short delay to ensure everything is visible
          setTimeout(() => {
            canvas.renderAll();
            console.log("Canvas re-rendered");
          }, 100);
        });
      } else {
        console.log("Rendering fresh slide:", newSlideNo);
        renderSlide(canvas, slide);
      }
    } else {
      console.log("Same slide, skipping render");
    }
  }, [currentSlideIndex, renderSlide, saveCanvasToSlide, slide]);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        className="border shadow-lg rounded-lg"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};
