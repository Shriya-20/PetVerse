import { database } from "@/app/_backend/firebaseConfig";
import { ref, update } from "firebase/database";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { user1Id, user2Id } = await req.json();
    const db = await connectToDatabase();
    const user2 = await db
      .collection("users")
      .find({ _id: new ObjectId(user2Id) });
    update(ref(database, `chats/${user1Id}/${user2Id}`), {
      name: user2.name,
      profile_picture: user2.profilePicture,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create chat room" });
  }
}
