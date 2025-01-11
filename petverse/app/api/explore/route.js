import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    const db = await connectToDatabase();
    const userData = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    console.log(userData.pets);
    const posts = await db
      .collection("posts")
      .find({
        petId: { $nin: userData.pets.map((petId) => new ObjectId(petId)) },
      })
      .limit(40) // Limit to 40 posts
      .toArray();

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 401 }
    );
  }
}
