"use client";
import { useInteractionStore } from "@/stores/interaction-store";
import { CanvasArea } from "../workspace/CanvasArea";
import { Toolbar } from "../workspace/Toolbar";
import { Topbar } from "../workspace/Topbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { InteractionWithResponse } from "@/types/InteractionWithResponse";
import { Loader2 } from "lucide-react";

export const WorkspaceScreen = () => {
  const { slides, setSlides, setId } = useInteractionStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const interactionId = localStorage.getItem("interactionId");
    if (slides || !interactionId) return;
    const getWorkspace = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `/api/interaction?interactionId=${interactionId}`
      );
      const result: InteractionWithResponse = await response.data;
      console.log(result);
      setId(result.id);
      setSlides(result.response);
    };
    getWorkspace();
    setIsLoading(false);
  }, [setId, setSlides, slides]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black relative overflow-hidden">
      <Topbar />
      <div className="flex ">
        {isLoading ? <Loader2 className="animate-spin" /> : <CanvasArea />}

        <Toolbar />
      </div>
    </div>
  );
};
