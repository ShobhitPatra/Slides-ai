"use client";
import { useInteractionStore } from "@/stores/interaction-store";
import { CanvasArea } from "../workspace/CanvasArea";
import { Toolbar } from "../workspace/Toolbar";
import { Topbar } from "../workspace/Topbar";
import { useEffect } from "react";
import axios from "axios";
import { InteractionWithResponse } from "@/types/InteractionWithResponse";

export const WorkspaceScreen = () => {
  const { slides, setSlides, setId } = useInteractionStore();

  useEffect(() => {
    console.log(1);
    const interactionId = localStorage.getItem("interactionId");
    if (slides || !interactionId) return;
    console.log(2);
    const getWorkspace = async () => {
      const response = await axios.get(
        `/api/interaction?interactionId=${interactionId}`
      );
      const result: InteractionWithResponse = await response.data;
      console.log(result);
      setId(result.id);
      setSlides(result.response);
    };
    getWorkspace();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black relative overflow-hidden">
      <Topbar />
      <div className="flex  ">
        <CanvasArea />
        <Toolbar />
      </div>
    </div>
  );
};
