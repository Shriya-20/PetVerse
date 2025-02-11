import { database } from "@/app/_backend/firebaseConfig";
import { ref, update } from "firebase/database";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import defaultImage from "@/public/default_user_profile_pic.jpeg";

export async function POST(req) {
  try {
    const { user1Id, user2Id } = await req.json();
    console.log(user1Id);
    console.log(user2Id);
    const db = await connectToDatabase();
    const user2 = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user2Id) });
    console.log(user2);
    update(ref(database, `chats/${user1Id}/${user2Id}`), {
      name: user2.username,
      unread_messages: null,
      profile_picture: user2.profilePicture
        ? user2.profilePicture
        : "https://firebasestorage.googleapis.com/v0/b/petverse-3fa63.firebasestorage.app/o/default_user_profile_pic.jpeg?alt=media&token=8fc7a77a-e2d1-499c-b986-ade30125b8bc",
    });
    console.log("Successfully initialized chat");
    return NextResponse.json("Successfully initialized chat", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create chat room" });
  }
}
