import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { imageUrl, userId } = await req.json();
    const db = await connectToDatabase();
    const response = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { profilePicture: imageUrl } }
      );
    if (response.ok) {
      console.log("Profile Pic url added to database");
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
