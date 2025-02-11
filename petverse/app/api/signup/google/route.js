import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { newUser } = await req.json();
    const db = await connectToDatabase();
    const email = newUser.email;
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      await db.collection("users").insertOne(newUser);
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.code }, { status: 500 });
  }
}
