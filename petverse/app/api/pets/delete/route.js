import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const data = await req.json();
    const db = await connectToDatabase();
    await db.collection("pet").deleteOne({ _id: new ObjectId(data.petId) });
    await db
      .collection("user")
      .updateOne(
        { _id: new ObjectId(data.userId) },
        { $pull: { pets: new ObjectId(data.petId) } }
      );

    return NextResponse.json("Successfully deleted profile", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete profile" },
      { status: 401 }
    );
  }
}
