import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const items = await db
      .collection("marketplaceitems")
      .aggregate([
        {
          $sample: { size: 30 },
        },
      ])
      .toArray();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.log("Error in fetching items");
    return NextResponse("Error in fetching items", { status: 404 });
  }
}
