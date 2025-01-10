import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import jwt from "jsonwebtoken";
import { admin } from "@/app/_backend/firebaseAdminConfig";

const SECRET_KEY = process.env.NEXT_PUBLIC_SESSION_SECRET_KEY;

export async function POST(req) {
  try {
    const { email, uid } = await req.json();
    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });

    // If user tries to login without creating a account.
    if (!user) {
      await admin.auth().deleteUser(uid);
      return NextResponse.json(
        { error: "Please create a account first" },
        { status: 401 }
      );
    }
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
    return NextResponse.json({ error: error.code }, { status: 500 });
  }
}
