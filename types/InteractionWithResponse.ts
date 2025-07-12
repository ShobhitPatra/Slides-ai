import { Interaction, Slide } from "@/app/generated/prisma";

export type InteractionWithResponse = Interaction & {
  response: Slide[];
};
