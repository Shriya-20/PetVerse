import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { deleteFolder } from "@/app/actions";

export async function POST(req) {
  try {
    const { itemId } = await req.json();
    const db = await connectToDatabase();
    await db
      .collection("marketplaceitems")
      .deleteOne({ _id: new ObjectId(itemId) });

    const path = `item/${itemId}`;
    await deleteFolder(path);
    return NextResponse.json("Successfully deleted", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 401 }
    );
  }
}
