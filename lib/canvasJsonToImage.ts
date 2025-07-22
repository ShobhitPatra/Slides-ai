export const canvasJsonToImage = async (
  canvasJson: Record<string, string>
): Promise<string> => {
  if (typeof window === "undefined") {
    throw new Error("This function must run in the browser.");
  }
  const { Canvas } = await import("fabric");

  return new Promise((resolve, reject) => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 800;
    tempCanvas.height = 600;

    const canvas = new Canvas(tempCanvas, {
      width: 800,
      height: 600,
      backgroundColor: "#fff",
    });

    if (
      typeof canvasJson === "object" &&
      canvasJson !== null &&
      "background" in canvasJson
    ) {
      canvas.backgroundColor = canvasJson.background;
    }

    canvas.loadFromJSON(canvasJson, () => {
      try {
        setTimeout(() => {
          canvas.renderAll();
          setTimeout(() => {
            const dataURL = canvas.toDataURL({
              format: "png",
              quality: 1.0,
              multiplier: 1,
            });

            canvas.dispose();
            resolve(dataURL);
          }, 50);
        }, 0);
      } catch (error) {
        canvas.dispose();
        reject(error);
      }
    });
  });
};
