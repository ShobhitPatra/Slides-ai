import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/ShobhitPatra" },
    { name: "Twitter", icon: Twitter, href: "https://x.com/shobhit_tw" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/shobhit-patra-4a4243264/",
    },
  ];

  return (
    <footer className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-white/5"
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <h6 className="font-mono text-gray-500 text-sm">
              <span className="text-gray-20">SlidesAi</span>@
              <span className="text-gray-20">Shobhit Patra</span>
            </h6>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
