import { create } from "zustand";
export interface Slide {
  slideNo: string;
  title: string;
  content: string;
  bulletPoints: Record<string, string>;
}

interface InteractionStoretype {
  id: string | null;
  setId: (id: string) => void;
  slides: Slide[] | null;
  setSlides: (slides: Slide[]) => void;
  currentSlideIndex: number;
  setCurrentSlideIndex: (currentSlideIndex: number) => void;
  activeSlide: Slide | null;
  setActiveSlide: (activeSlide: Slide) => void;
}

export const useInteractionStore = create<InteractionStoretype>((set) => ({
  id: null,
  setId: (id: string) => set({ id }),
  slides: null,
  setSlides: (slides: Slide[]) => set({ slides }),
  currentSlideIndex: 0,
  setCurrentSlideIndex: (currentSlideIndex: number) =>
    set({ currentSlideIndex }),
  activeSlide: null,
  setActiveSlide: (activeSlide: Slide) => set({ activeSlide }),
}));
