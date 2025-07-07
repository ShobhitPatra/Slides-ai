import { useInteractionStore } from "@/stores/interaction-store";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import { useState } from "react";

export const PageNavigator = () => {
  const { currentSlideIndex, setCurrentSlideIndex, setActiveSlide, slides } =
    useInteractionStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nextSlide = () => {
    if (!slides || currentSlideIndex >= slides.length - 1) return;
    setIsLoading(true);
    const nextSlideIndex = currentSlideIndex + 1;
    setCurrentSlideIndex(nextSlideIndex);
    setActiveSlide(slides[nextSlideIndex]);
    console.log(slides[nextSlideIndex]);
    setIsLoading(false);
  };
  const previousSlide = () => {
    if (!slides || currentSlideIndex <= 0) return;
    setIsLoading(true);
    const prevSlideIndex = currentSlideIndex - 1;
    setCurrentSlideIndex(prevSlideIndex);
    setActiveSlide(slides[prevSlideIndex]);
    console.log(slides[prevSlideIndex]);

    setIsLoading(false);
  };

  return (
    <div className=" flex gap-2">
      <button
        disabled={isLoading}
        aria-label="Go to the previous slide"
        onClick={previousSlide}
      >
        <ArrowLeftSquare
          onClick={previousSlide}
          className="text-gray-300 hover:text-gray-900 hover:bg-green-300 "
        />
      </button>
      <p className="bg-gray-300 w-6 text-gray-900 font-bold rounded-sm flex items-center justify-center">
        {currentSlideIndex + 1}
      </p>
      <button
        disabled={isLoading}
        aria-label="Go to the next slide"
        onClick={nextSlide}
      >
        <ArrowRightSquare className="text-gray-300 hover:text-gray-900 hover:bg-red-300 " />
      </button>
    </div>
  );
};
