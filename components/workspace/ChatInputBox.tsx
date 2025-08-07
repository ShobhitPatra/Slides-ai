"use client";

import { useWorkspaceStore } from "@/stores/worksapce-store";
import { InteractionWithResponse } from "@/types/InteractionWithResponse";
import { WorkspaceWithInteraction } from "@/types/WorkspaceWithInteraction";
import axios from "axios";
import { Loader2, SendHorizonal } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const ChatInputBox = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { setWorkspaceId, setWorkspace } = useWorkspaceStore();

  const router = useRouter();
  const session = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim()) {
      setIsLoading(true);
      if (!session.data?.user) {
        signIn();
      }
      try {
        const response = await axios.post(
          `/api/generateSlides`,
          {
            prompt: inputValue.trim(),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result: WorkspaceWithInteraction = await response.data;
        // setting context for workspace
        setWorkspace(result);
        setWorkspaceId(result.id);
        // setting context for interaction
        const interaction = result.Interactions[0] as InteractionWithResponse;
        localStorage.setItem("interactionId", interaction.id);

        router.push(`/workspace/${result.id}/interaction/${interaction.id}`);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center bg-white/10  backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group-hover:border-white/20 transition-all duration-300">
        <input
          disabled={isLoading}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="sm:py-5 flex-1 md:py-2 md:px-2 text-white placeholder-gray-400 bg-transparent border-none outline-none text-base sm:text-lg"
        />
        <button
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative m-1 px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25"
        >
          <span className="flex items-center gap-2">
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <SendHorizonal
                className={`w-3 h-3 transition-transform duration-300 ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            )}
          </span>
        </button>
      </div>
    </form>
  );
};
