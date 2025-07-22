import { Slide } from "@/app/generated/prisma";
// import { JsonValue } from "@/app/generated/prisma/runtime/library";
import { Canvas, Textbox } from "fabric";

export const generateCanvas = async (slide: Slide) => {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = 800;
  tempCanvas.height = 600;
  const canvas = new Canvas(tempCanvas, {
    width: 800,
    height: 600,
    backgroundColor: "#fff",
  });

  const title = new Textbox(slide.title, {
    width: 600,
    height: 150,
    textAlign: "center",
    top: 50,
    left: 100,
    fontSize: 28,
    fontWeight: "bold",
    fill: "#1f2937",
  });
  canvas.add(title);

  const content = new Textbox(slide.content, {
    width: 600,
    top: 375,
    left: 100,
    fontSize: 18,
    fill: "#374151",
  });
  canvas.add(content);
  let topOffset = 170;
  const bulletPoints = Object.values(slide.bulletPoints || {});
  bulletPoints.forEach((point) => {
    const bullet = new Textbox(`> ${point}`, {
      width: 600,
      top: topOffset,
      left: 100,
      fontSize: 20,
      fill: "#4b5563",
    });
    canvas.add(bullet);
    topOffset += 40;
  });
  const canvasJson = canvas.toJSON();
  canvas.dispose();
  return canvasJson;
};
