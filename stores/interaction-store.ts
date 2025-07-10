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
  setCurrentSlideIndex: (index: number) => void;

  activeSlide: Slide | null;
  setActiveSlide: (slide: Slide | null) => void;
}

export const useInteractionStore = create<InteractionStoretype>((set, get) => ({
  id: null,
  setId: (id) => set({ id }),

  slides: null,
  setSlides: (slides) => {
    set({ slides });
    const currentIndex = get().currentSlideIndex;
    set({ activeSlide: slides?.[currentIndex] ?? null });
  },

  currentSlideIndex: 0,
  setCurrentSlideIndex: (index) => {
    const slides = get().slides;
    set({ currentSlideIndex: index, activeSlide: slides?.[index] ?? null });
  },

  activeSlide: null,
  setActiveSlide: (slide) => set({ activeSlide: slide }),
}));
