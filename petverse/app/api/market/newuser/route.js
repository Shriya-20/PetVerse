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
        { $match: { sellerId: { $ne: new ObjectId(userId) } } },
        { $sample: { size: 30 } },
      ])
      .toArray();

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.log("Error in fetching items");
    console.log(error);
    return NextResponse.json("Error in fetching items", { status: 404 });
  }
}
