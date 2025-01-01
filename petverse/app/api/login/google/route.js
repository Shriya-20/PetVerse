import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PUBLIC_SESSION_SECRET_KEY;

export async function POST(req) {
  try {
    const { email } = await req.json();
    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.code }, { status: 500 });
  }
}
