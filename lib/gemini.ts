import { GoogleGenAI } from "@google/genai";
import { generatePrompt } from "./default";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export const generateSlides = async (prompt: string) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: generatePrompt(prompt),
    });

    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("No content returned from Gemini.");
    }

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const slides = JSON.parse(cleaned);

    return slides;
  } catch (error) {
    console.error(`error generating slides from gemini api ${error}`);
    throw error;
  }
};

export const updateSlides = async (prompt: string) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: generatePrompt(prompt),
    });

    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("No content returned from Gemini.");
    }

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const slides = JSON.parse(cleaned);

    return slides;
  } catch (error) {
    console.error(`error generating slides from gemini api ${error}`);
    throw error;
  }
};
