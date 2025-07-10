"use client";
import { WorkspaceScreen } from "@/components/screens/Workspace";
import { Slide, useInteractionStore } from "@/stores/interaction-store";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { WorkspaceWithInteraction } from "@/types/WorkspaceWithInteraction";

export default function Workspace() {
  const { workspaceId, interactionId } = useParams();
  const { setId, setSlides, setActiveSlide } = useInteractionStore();
  useEffect(() => {
    const fetchWorkspace = async () => {
      if (!workspaceId) return;
      try {
        const response = await axios.get(
          `/api/workspace?workspaceId=${workspaceId}`
        );
        const result: WorkspaceWithInteraction = await response.data;
        const interaction = result.Interactions.find(
          (i) => i.id == interactionId
        );
        if (!interaction) return;
        setId(interaction.id);
        const slides = interaction.response as unknown as Slide[];
        setSlides(slides);
        setActiveSlide(slides[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkspace();
  }, [workspaceId, interactionId]);
  return (
    <>
      <WorkspaceScreen />
    </>
  );
}
