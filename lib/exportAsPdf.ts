import { canvasJsonToImage } from "./canvasJsonToImage";
import jsPDF from "jspdf";
export const exportSlidesAsPDF = async (slides: Record<string, string>[]) => {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [800, 600],
  });

  for (let i = 0; i < slides.length; i++) {
    if (i > 0) {
      pdf.addPage();
    }

    const image = await canvasJsonToImage(slides[i]);

    pdf.addImage(image, "PNG", 0, 0, 800, 600);
  }

  pdf.save("slides.pdf");
};
