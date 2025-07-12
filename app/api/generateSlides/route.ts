import { Slide } from "@/app/generated/prisma";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/db";
import { generateSlides } from "@/lib/gemini";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { msg: "user not authenticated" },
        { status: 400 }
      );
    }
    const email = session?.user?.email as string;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { msg: "user not in database" },
        { status: 402 }
      );
    }
    if (!prompt) {
      return NextResponse.json({ msg: "no prompt found" }, { status: 400 });
    }
    const result = await generateSlides(prompt as string);
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
    const workspace = await prisma.workspace.create({
      data: {
        userId: existingUser.id,
        Interactions: {
          create: {
            prompt,
            response: {
              create: slides,
            },
          },
        },
      },
      include: {
        Interactions: {
          include: {
            response: true,
          },
        },
      },
    });

    return NextResponse.json(workspace);
  } catch (error) {
    console.error(`ERROR IN /generateSlides route ${error}`);
    return NextResponse.json({ MSG: "INTERNAL SERVER ERROR" }, { status: 500 });
  }
}
