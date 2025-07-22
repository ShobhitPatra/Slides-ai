"use client";
import { WorkspaceScreen } from "@/components/screens/Workspace";
import { useInteractionStore } from "@/stores/interaction-store";
import axios from "axios";
import { useEffect } from "react";
import { InteractionWithResponse } from "@/types/InteractionWithResponse";
import { Slide } from "@/app/generated/prisma";

export default function Workspace() {
  const { setId, setSlides, setActiveSlide } = useInteractionStore();
  useEffect(() => {
    const fetchWorkspace = async () => {
      const interactionId = localStorage.getItem("interactionId");
      if (!interactionId) return;
      try {
        const response = await axios.get(
          `/api/workspace?interactionId=${interactionId}`
        );
        const result: InteractionWithResponse = await response.data;

        if (!result) return;
        setId(result.id);
        const slides = result.response as unknown as Slide[];
        setSlides(slides);
        setActiveSlide(slides[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkspace();
  }, []);
  return (
    <>
      <WorkspaceScreen />
    </>
  );
}
