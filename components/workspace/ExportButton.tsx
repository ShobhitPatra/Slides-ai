import { Send } from "lucide-react";
import { Button } from "../ui/button";

export const ExportButton = () => {
  return (
    <Button className="  relative m-2 px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25">
      Export{" "}
      <span>
        <Send />
      </span>
    </Button>
  );
};
