import { authOptions } from "../../../../lib/authOptions";
import { prisma } from "../../../../lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { slideNo, canvas } = await req.json();
    const { searchParams } = new URL(req.url);
    const interactionId = searchParams.get("interactionId");
    const session = await getServerSession(authOptions);
    if (!interactionId) {
      return NextResponse.json(
        { msg: "interaction id missing" },
        { status: 400 }
      );
    }
    if (!session) {
      return NextResponse.json(
        { msg: "user not authenticated" },
        { status: 400 }
      );
    }

    const existingInteraction = await prisma.interaction.findUnique({
      where: { id: interactionId as string },
    });
    if (!existingInteraction) {
      return NextResponse.json(
        { msg: "interaction does not exist" },
        { status: 400 }
      );
    }

    const slide = await prisma.slide.update({
      data: {
        canvasJson: canvas,
      },
      where: {
        interactionId: interactionId,
        slideNo: slideNo,
      },
      include: {
        interaction: true,
      },
    });
    return NextResponse.json(slide);
  } catch (error) {
    console.log(`error in update slides ${error}`);
    return NextResponse.json({ msg: "INTERNAL SERVER ERROR" }, { status: 500 });
  }
}
