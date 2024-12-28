import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    const db = await connectToDatabase();
    const userPets = await db
      .collection("pet")
      .find({ owner: new ObjectId(userId) })
      .toArray();
    return NextResponse.json(userPets, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
