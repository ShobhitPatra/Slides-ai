import { Workspace } from "@/app/generated/prisma";
import { create } from "zustand";

interface WorkspaceStoreProps {
  id: string | null;
  setWorkspaceId: (id: string) => void;
  workspace: Workspace | null;
  setWorkspace: (workspace: Workspace) => void;
}

export const useWorkspaceStore = create<WorkspaceStoreProps>((set) => ({
  id: null,
  setWorkspaceId: (id: string) => set({ id }),
  workspace: null,
  setWorkspace: (workspace: Workspace) => set({ workspace }),
}));
