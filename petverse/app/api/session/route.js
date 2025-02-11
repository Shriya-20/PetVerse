import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.NEXT_PUBLIC_SESSION_SECRET_KEY;

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(null);
    }
    const userData = jwt.verify(token, SECRET_KEY);

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 403 });
  }
}
