import { JsonValue } from "@/app/generated/prisma/runtime/library";
import { canvasJsonToImage } from "./canvasJsonToImage";

export const exportSlides = async (slides: JsonValue[]) => {
  const pptxgen = (await import("pptxgenjs")).default;

  const ppt = new pptxgen();

  for (const slide of slides) {
    const page = ppt.addSlide();
    const image = await canvasJsonToImage(slide);

    page.addImage({
      data: image,
      x: 0,
      y: 0,
      w: 10,
      h: 7.5,
    });
  }
  return await ppt.writeFile({ fileName: "Slides.pptx" });
};
