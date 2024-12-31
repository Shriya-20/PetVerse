import { connectToDatabase } from "@/app/utils/db";
import { handleSignUpWithEmail } from "@/app/_backend/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userName, email, password } = await req.json();
    const newUser = await handleSignUpWithEmail(userName, email, password);

    const db = await connectToDatabase();
    await db.collection("users").insertOne(newUser);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    if (error.code == "auth/email-already-in-use") {
      return NextResponse.json({ error: error.code }, { status: 409 });
    }
    return NextResponse.json({ error: error.code }, { status: 500 });
  }
}
