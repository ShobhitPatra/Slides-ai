import { useInteractionStore } from "@/stores/interaction-store";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";

export const PageNavigator = () => {
  const { currentSlideIndex, setCurrentSlideIndex, slides } =
    useInteractionStore();

  const nextSlide = () => {
    if (!slides || currentSlideIndex >= slides.length - 1) return;
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const previousSlide = () => {
    if (!slides || currentSlideIndex <= 0) return;
    setCurrentSlideIndex(currentSlideIndex - 1);
  };

  const canGoNext = slides && currentSlideIndex < slides.length - 1;
  const canGoPrevious = slides && currentSlideIndex > 0;

  return (
    <div className="flex gap-2 items-center">
      <button
        disabled={!canGoPrevious}
        aria-label="Go to the previous slide"
        onClick={previousSlide}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeftSquare
          className={`text-gray-300 transition-colors ${
            canGoPrevious ? "hover:text-gray-900 hover:bg-green-300" : ""
          }`}
        />
      </button>

      <p className="bg-gray-300 w-8 h-8 text-gray-900 font-bold rounded-sm flex items-center justify-center">
        {currentSlideIndex + 1}
      </p>

      <button
        disabled={!canGoNext}
        aria-label="Go to the next slide"
        onClick={nextSlide}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowRightSquare
          className={`text-gray-300 transition-colors ${
            canGoNext ? "hover:text-gray-900 hover:bg-red-300" : ""
          }`}
        />
      </button>
    </div>
  );
};
