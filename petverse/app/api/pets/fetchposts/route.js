import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { petId } = await req.json();
    const db = await connectToDatabase();
    const posts = await db
      .collection("posts")
      .find({ pet_id: new ObjectId(petId) })
      .toArray();
    return NextResponse.json(posts, { status: 200 });
    return;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 401 }
    );
  }
}
