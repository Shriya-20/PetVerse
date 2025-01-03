import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { handleDeleteUser } from "@/app/_backend/auth";
import { deleteFolder } from "@/app/actions";

export async function POST(req) {
  try {
    console.log("User DELETE STARTED")
    const { userId } = await req.json();
    const db = await connectToDatabase();
    console.log("connected to db")

    const userData = await db.collection("users").findOne({_id: new ObjectId(userId)});
    if(userData.pets){
      for (const pet of userData.pets) {
        const petId = pet.toString();
        await deleteFolder(`${petId}`);
      }
    }
    console.log("Deleted pet data from firebase storage")

    const userItems = await db.collection("marketplaceitems").find({sellerId: new ObjectId(userId)}, { _id: 1}).toArray();
    if(userItems.len != 0){
      for (const userItem of userItems){
        const itemId = userItem._id;
        await deleteFolder(`item/${itemId}`)
      }
    }
    console.log("Deleted User item data from firebase storage")

    await deleteFolder(`users/${userId}`)
    console.log("Deleted User data from firebase storage")

    await db.collection("users").deleteOne({ _id: new ObjectId(userId) });
    console.log("Successfully deleted user");
    await db.collection("pet").deleteMany({ owner: new ObjectId(userId) });
    console.log("sucessfully deleted user pets");
    await db
      .collection("marketplaceitems")
      .deleteMany({ sellerId: new ObjectId(userId) });
    console.log("Sucessfully deleted user items");

    await handleDeleteUser();
    console.log("Deleted user from firebase auth")


    return NextResponse.json("Successfully deleted user", { status: 200 });
  } catch (error) {
    return NextResponse.json({error: error.code}, { status: 401 });
  }
}
