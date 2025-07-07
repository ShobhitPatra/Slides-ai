"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatedBackgroundElements } from "../ui/AnimatedBackgroundElements";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import { useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";
import { Slide, useInteractionStore } from "@/stores/interaction-store";
import { WorkspaceWithInteraction } from "@/types/WorkspaceWithInteraction";
import { useWorkspaceStore } from "@/stores/worksapce-store";

export const Landing = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const session = useSession();
  const router = useRouter();
  const { setId, setSlides, setActiveSlide } = useInteractionStore();
  const { setWorkspaceId, setWorkspace } = useWorkspaceStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim()) {
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
        console.log(result);
        // setting context for workspace
        setWorkspace(result);
        setWorkspaceId(result.id);
        // setting context for interaction

        const interaction = result.Interactions[0];
        const slides = interaction.response as unknown as Slide[];
        setId(interaction.id);
        setSlides(slides);
        setActiveSlide(slides[0]);
        router.push(`/workspace/${result.id}/interaction/${interaction.id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black relative overflow-hidden">
      <AnimatedBackgroundElements />

      {/* navbar  */}
      <Navbar />
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6 leading-tight">
            Generate. Edit. Present.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              AI-Powered Slides at Your Fingertips.
            </span>
          </h1>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-lg group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all duration-300"></div>
              <div className="relative flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group-hover:border-white/20 transition-all duration-300">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your topic here"
                  className="flex-1 px-6 py-4 sm:py-5 text-white placeholder-gray-400 bg-transparent border-none outline-none text-base sm:text-lg"
                />
                <button
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative m-2 px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25"
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    />
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 to-blue-600/0 hover:from-purple-600/20 hover:to-blue-600/20 transition-all duration-300"></div>
                </button>
              </div>
            </div>
          </form>

          {/* Description */}
          <p className="lg:p-9 md:p-6 p-4 text-lg sm:text-xl lg:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Slides AI is your intelligent slide creator. Just enter a topic, and
            watch AI generate a clean, editable deck tailored to your prompt.
            Customize it in our intuitive editor and export to PDF or PowerPoint
            — no design skills required
          </p>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
      <Footer />
    </div>
  );
};
