// import { authOptions } from "@/lib/authOptions";
import { generateSlides } from "@/lib/gemini";
// import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     { msg: "user not authenticated" },
    //     { status: 402 }
    //   );
    // }
    if (!prompt) {
      return NextResponse.json({ msg: "no prompt found" }, { status: 400 });
    }
    const result = await generateSlides(prompt as string);
    if (!result) {
      return NextResponse.json(
        { msg: "failed to generate response" },
        { status: 400 }
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error(`ERROR IN /generateSlides route ${error}`);
    return NextResponse.json({ MSG: "INTERNAL SERVER ERROR" }, { status: 500 });
  }
}
