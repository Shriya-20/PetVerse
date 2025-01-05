import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { handleDeleteUser } from "@/app/_backend/auth";
import { deleteFolder } from "@/app/actions";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    const db = await connectToDatabase();

    // Delete user from firebase auth
    await handleDeleteUser();

    // Delete pet data from firebase storage
    const userData = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    if (userData.pets) {
      for (const pet of userData.pets) {
        const petId = pet.toString();
        await deleteFolder(`${petId}`);
      }
    }

    // Delete user items data from firebase storage
    const userItems = await db
      .collection("marketplaceitems")
      .find({ sellerId: new ObjectId(userId) }, { _id: 1 })
      .toArray();
    if (userItems.len != 0) {
      for (const userItem of userItems) {
        const itemId = userItem._id;
        await deleteFolder(`item/${itemId}`);
      }
    }

    // Delete user profile data from firebase storage
    await deleteFolder(`users/${userId}`);

    // Delete user, user pets and user items from db
    await db.collection("users").deleteOne({ _id: new ObjectId(userId) });
    await db.collection("pet").deleteMany({ owner: new ObjectId(userId) });
    await db
      .collection("marketplaceitems")
      .deleteMany({ sellerId: new ObjectId(userId) });

    return NextResponse.json("Successfully deleted user", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.code }, { status: 401 });
  }
}
