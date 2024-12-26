import { NextResponse } from "next/server";
import { handleSignOut } from "@/app/_backend/auth";

export async function GET(req) {
  try {
    await handleSignOut();
    const token = await req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Already logged out" },
        { status: 200 }
      );
    }

    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
