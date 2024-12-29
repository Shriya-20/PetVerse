import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    const db = await connectToDatabase();
    const items = await db
      .collection("marketplaceitems")
      .find({ sellerId: new ObjectId(userId) })
      .toArray();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 401 }
    );
  }
}
