import type { Canvas, FabricObject } from "fabric";
import { create } from "zustand";

interface CanvasStoreProps {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas) => void;
  getSelectedObject: () => FabricObject | null;
}

export const useCanvasStore = create<CanvasStoreProps>((set, get) => ({
  canvas: null,
  setCanvas: (canvas: Canvas) => set({ canvas }),
  getSelectedObject: () => {
    const canvas = get().canvas;
    if (!canvas) return null;
    return canvas.getActiveObject() ?? null;
  },
}));
