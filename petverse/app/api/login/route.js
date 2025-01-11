import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import jwt from "jsonwebtoken";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/_backend/firebaseConfig";

const SECRET_KEY = process.env.NEXT_PUBLIC_SESSION_SECRET_KEY;

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "24h",
    });

    const response = NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    if (error.code == "auth/invalid-credential") {
      return NextResponse.json({ error: error.code }, { status: 401 });
    }
    return NextResponse.json({ error: error.code }, { status: 500 });
  }
}
