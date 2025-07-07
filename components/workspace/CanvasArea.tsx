"use client";
import { useInteractionStore } from "@/stores/interaction-store";
import { CanvasEditor } from "./CanvasEditor";

export const CanvasArea = () => {
  const { activeSlide } = useInteractionStore();

  return (
    <div className="md:w-3/4 bg-slate-400  m-4 rounded-sm flex items-center justify-center">
      {/* <div className="bg-white"> */}
      <CanvasEditor slide={activeSlide!} key={activeSlide?.slideNo} />
      {/* </div> */}
    </div>
  );
};
