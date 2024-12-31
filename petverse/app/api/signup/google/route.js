import { NextResponse } from "next/server";
import { signUpWithGoogle } from "@/app/_backend/auth";

export async function GET() {
  try {
    const newUser = await signUpWithGoogle();
    console.log(newUser);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.code }, { status: 500 });
  }
}
