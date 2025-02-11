import { NextResponse } from "next/server";
import { resetPasswordWithEmail } from "@/app/_backend/auth";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await resetPasswordWithEmail(email);
    return NextResponse.json({ message: "Sent email" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.code }, { status: 500 });
  }
}
