import React from "react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
interface ToolTemplateProps {
  key: string;
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClickHandler: () => void;
}
export const ToolTemplate = ({
  name,
  Icon,
  onClickHandler,
}: ToolTemplateProps) => {
  return (
    <Button
      onClick={onClickHandler}
      size="sm"
      title={name}
      aria-label={name}
      className={cn(
        "h-12 flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 bg-gray-200"
      )}
    >
      <Icon className="h-4 w-4  " />
      <span className="text-xs">{name}</span>
    </Button>
  );
};
