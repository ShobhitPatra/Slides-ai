"use client";
// import { useInteractionStore } from "@/stores/interaction-store";
import { CanvasEditor } from "./CanvasEditor";

export const CanvasArea = () => {
  // const { activeSlide } = useInteractionStore();

  return (
    <div className="md:w-3/4 bg-slate-400 opacity-90 md:m-4 md:py-8  rounded-sm flex items-center justify-center">
      <CanvasEditor
      // slide={activeSlide!} key={activeSlide?.slideNo}
      />
    </div>
  );
};
