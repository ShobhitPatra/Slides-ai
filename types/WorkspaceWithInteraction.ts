import { Interaction, Workspace } from "@/app/generated/prisma";

export type WorkspaceWithInteraction = Workspace & {
  Interactions: Interaction[];
};
