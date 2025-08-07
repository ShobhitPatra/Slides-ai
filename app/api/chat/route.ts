import { Slide } from "@/app/generated/prisma";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/db";
import { updateSlides } from "@/lib/gemini";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export default async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const message = await req.json();
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    if (!session) {
      return NextResponse.json({ msg: "user not logged in" }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ msg: "no message found" }, { status: 400 });
    }
    if (!workspaceId) {
      return NextResponse.json({ msg: "workspace not found" }, { status: 400 });
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });
    if (!existingUser) {
      return NextResponse.json({ msg: "user not found" }, { status: 400 });
    }
    const result = await updateSlides(message as string);
    const slides = result.map((slide: Slide) => ({
      slideNo: slide.slideNo as number,
      title: slide.title,
      content: slide.content,
      bulletPoints: slide.bulletPoints,
      canvasJson: null,
    }));
    if (!result) {
      return NextResponse.json(
        { msg: "failed to generate response" },
        { status: 400 }
      );
    }
    const workspace = await prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        Interactions: {
          create: {
            prompt: message,
            response: slides,
          },
        },
      },
      include: {
        Interactions: true,
      },
    });
    return NextResponse.json(workspace);
  } catch (error) {
    console.log(`ERROR IN CHAT ROUTE ${error}`);
    NextResponse.json({ msg: "INTERNAL SERVER ERROR" }, { status: 500 });
  }
}
