"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageNavigator } from "./PageNavigator";
import { ExportButton } from "./ExportButton";

export const Topbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pushHome = () => {
    router.push("/");
  };
  return (
    <nav className="relative z-50 w-full hover:cursor-pointer ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span
              onClick={pushHome}
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200"
            >
              Slides AI
            </span>
          </div>

          <PageNavigator />

          <ExportButton />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 backdrop-blur-md rounded-lg mt-2 border border-white/10"></div>
          </div>
        )}
      </div>
    </nav>
  );
};
