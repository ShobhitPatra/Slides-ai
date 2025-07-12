import { Slide } from "@/app/generated/prisma";
import { JsonValue } from "@/app/generated/prisma/runtime/library";
import { create } from "zustand";

interface InteractionStoretype {
  id: string | null;
  setId: (id: string) => void;

  slides: Slide[] | null;
  setSlides: (slides: Slide[]) => void;

  currentSlideIndex: number;
  setCurrentSlideIndex: (index: number) => void;

  activeSlide: Slide | null;
  setActiveSlide: (slide: Slide | null) => void;

  saveCanvasToCurrentSlide: (canvasJson: JsonValue) => void;
  saveCanvasToSlide: (slideIndex: number, canvasJson: JsonValue) => void;
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

  saveCanvasToCurrentSlide: (canvasJson: JsonValue) => {
    const { activeSlide, currentSlideIndex, slides } = get();
    if (!activeSlide || !slides) {
      console.warn("No active slide or slides available to save canvas");
      return;
    }

    const updatedSlide: Slide = {
      ...activeSlide,
      canvasJson: canvasJson,
    };

    const updatedSlides = [...slides];
    updatedSlides[currentSlideIndex] = updatedSlide;

    set({
      slides: updatedSlides,
      activeSlide: updatedSlide,
    });

    console.log(`Canvas saved to slide ${currentSlideIndex + 1}`);
  },

  saveCanvasToSlide: (slideIndex: number, canvasJson: JsonValue) => {
    const { slides, currentSlideIndex } = get();
    if (!slides || slideIndex < 0 || slideIndex >= slides.length) {
      console.warn("Invalid slide index or no slides available");
      return;
    }

    const slideToUpdate = slides[slideIndex];
    const updatedSlide: Slide = {
      ...slideToUpdate,
      canvasJson: canvasJson,
    };

    const updatedSlides = [...slides];
    updatedSlides[slideIndex] = updatedSlide;

    const newActiveSlide =
      slideIndex === currentSlideIndex
        ? updatedSlide
        : slides[currentSlideIndex];

    set({
      slides: updatedSlides,
      activeSlide: newActiveSlide,
    });

    console.log(`Canvas saved to slide ${slideIndex + 1}`);
  },
}));
