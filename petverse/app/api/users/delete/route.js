import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { handleDeleteUser } from "@/app/_backend/auth";

export async function POST(req) {
  try {
    const user = await req.json();
    const db = await connectToDatabase();
    await handleDeleteUser();
    await db.collection("users").deleteOne({ _id: new ObjectId(user.id) });
    console.log("Successfully deleted user");
    await db.collection("pet").deleteMany({ owner: new ObjectId(user.id) });
    console.log("sucessfully deleted user pets");
    await db
      .collection("marketplaceitems")
      .deleteMany({ sellerId: new ObjectId(user.id) });
    console.log("Sucessfully deleted user items");

    return NextResponse.json("Successfully deleted user", { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to delete user", { status: 401 });
  }
}
