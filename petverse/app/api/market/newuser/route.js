import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    const db = await connectToDatabase();
    const items = await db
      .collection("marketplaceitems")
      .aggregate([
        {
          $sample: { size: 30 },
          $skip: { sellerId: new ObjectId(userId) },
        },
      ])
      .toArray();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.log("Error in fetching items");
    return NextResponse("Error in fetching items", { status: 404 });
  }
}
