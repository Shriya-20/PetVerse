import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { type, searchVal, userId } = await req.json();
    const db = await connectToDatabase();
    if (type === "item") {
      const data = await db
        .collection("marketplaceitems")
        .aggregate([
          {
            $match: {
              sellerId: { $ne: new ObjectId(userId) },
            },
          },
          {
            $match: {
              title: { $regex: searchVal, $options: "i" },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "sellerId",
              foreignField: "_id",
              as: "sellerDetails",
            },
          },
        ])
        .toArray();

      return NextResponse.json(data, { status: 200 });
    } else {
      const data = [];
    }
    return NextResponse.json([], { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error searching for chats" },
      { status: 401 }
    );
  }
}
