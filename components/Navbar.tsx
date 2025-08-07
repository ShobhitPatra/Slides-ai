"use client";
import React, { useState } from "react";
import { Github, Menu, TriangleAlert, User2, X } from "lucide-react";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { UserAvatar } from "./UserAvatar";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data } = useSession();
  const navItems = [
    {
      name: "Report Issue",
      href: "https://github.com/ShobhitPatra/Slides-ai/issues",
      Icon: TriangleAlert,
    },
    {
      name: "Contribute",
      href: "https://github.com/ShobhitPatra/Slides-ai",
      Icon: Github,
    },
    {
      name: "Contact",
      href: "https://www.linkedin.com/in/shobhit-patra-4a4243264/",
      Icon: User2,
    },
  ];

  return (
    <nav className="relative z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200">
              Slides AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  href={item.href}
                  key={item.name}
                  className="flex items-center text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-800 rounded-lg"
                >
                  <item.Icon className="text-white h-4 w-4 m-1 " />
                  <h3 className="font-mono">{item.name}</h3>
                </a>
              ))}
              {!data?.user ? (
                <Button
                  onClick={() => signIn()}
                  variant={"outline"}
                  className="text-gray-300 rounded-full hover:bg-gray-300 hover:text-gray-800"
                >
                  SignIn
                </Button>
              ) : (
                <div className="rounded-full m-auto ">
                  <UserAvatar image={data?.user.image as string} />
                </div>
              )}
            </div>
          </div>

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
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 backdrop-blur-md rounded-lg mt-2 border border-white/10">
              {navItems.map((item) => (
                <a
                  href={item.href}
                  key={item.name}
                  className="flex items-center text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-800 rounded-lg"
                >
                  <item.Icon className="text-white h-4 w-4 m-1 " />
                  <h3 className="font-mono">{item.name}</h3>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
