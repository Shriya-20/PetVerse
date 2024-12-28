import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { imageUrl, petId } = await req.json();
    const db = await connectToDatabase();
    console.log("Connected to db");
    await db
      .collection("pet")
      .updateOne(
        { _id: new ObjectId(petId) },
        { $set: { profilePicture: imageUrl } }
      );
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
