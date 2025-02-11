import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { deleteFolder } from "@/app/actions";

export async function POST(req) {
  try {
    const data = await req.json();
    const db = await connectToDatabase();

    // Delete pet data from pets collection
    await db.collection("pet").deleteOne({ _id: new ObjectId(data.petId) });

    // Delete pet data from users collections
    const response = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(data.userId) },
        { $pull: { pets: new ObjectId(data.petId) } }
      );

    // Delete pet data from firebase storage
    const path = `${data.petId}`;
    await deleteFolder(path);
    return NextResponse.json("Successfully deleted profile", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
