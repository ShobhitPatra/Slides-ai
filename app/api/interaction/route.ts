import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const interactionId = searchParams.get("interactionId");
    if (!interactionId) {
      return NextResponse.json(
        { msg: "no interactionId found" },
        { status: 500 }
      );
    }
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { msg: "user not authenticated" },
        { status: 400 }
      );
    }
    const userEmail = session.user?.email as string;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ msg: "user not in db" }, { status: 400 });
    }

    const interaction = await prisma.interaction.findUnique({
      where: {
        id: interactionId,
      },
      include: {
        response: true,
      },
    });
    return NextResponse.json(interaction);
  } catch (error) {
    console.log(`error in get workspace ${error}`);
    NextResponse.json({ msg: "UINTERNAL SERVE ERROR" }, { status: 500 });
  }
}
