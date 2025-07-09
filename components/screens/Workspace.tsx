import { CanvasArea } from "../workspace/CanvasArea";
import { Toolbar } from "../workspace/Toolbar";
import { Topbar } from "../workspace/Topbar";

export const WorkspaceScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black relative overflow-hidden">
      <Topbar />
      <div className="flex  ">
        <Toolbar canvasBackground="#ffffff" />
        <CanvasArea />
      </div>
    </div>
  );
};
