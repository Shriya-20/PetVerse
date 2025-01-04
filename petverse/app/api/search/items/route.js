import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { type, searchVal } = await req.json();
    const db = await connectToDatabase();
    if (type === "item") {
      const data = await db
        .collection("marketplaceitems")
        .find({ title: { $regex: searchVal, $options: "i" } })
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
