import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.NEXT_PUBLIC_SESSION_SECRET_KEY;

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    console.log("Went through response cookies");

    if (!token) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    console.log(token);
    console.log("GOT token");

    const userData = jwt.verify(token, SECRET_KEY);
    console.log(`User Data extracted from cookie: ${userData}`);

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return NextResponse.json("Invalid or expired token", { status: 403 });
  }
}
