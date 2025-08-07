"use client";
import { Loader2, Download } from "lucide-react";
import { Button } from "../ui/button";
import { useInteractionStore } from "@/stores/interaction-store";
import { useState } from "react";
import { generateCanvas } from "@/lib/generateCanvas";
import { exportSlidesAsPDF } from "@/lib/exportAsPdf";

export const ExportButton = () => {
  const { slides, setSlides } = useInteractionStore();
  const [isLoading, setIsLoading] = useState(false);
  const onExportHandler = async () => {
    if (!slides) return;
    setIsLoading(true);
    const updatedSlides = await Promise.all(
      slides.map(async (slide) => {
        if (slide.canvasJson) return slide;

        const slideCanvas = await generateCanvas(slide);
        return { ...slide, canvasJson: slideCanvas };
      })
    );
    setSlides(updatedSlides);

    const canvasJsonPages: Record<string, string>[] = [];
    updatedSlides.map((slide) => canvasJsonPages.push(slide.canvasJson));
    console.log(canvasJsonPages);
    await exportSlidesAsPDF(canvasJsonPages);
    setIsLoading(false);
  };
  return (
    <Button
      onClick={onExportHandler}
      className="relative m-2 px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25"
    >
      <span>
        {isLoading ? <Loader2 className="animate-spin" /> : <Download />}
      </span>
    </Button>
  );
};
