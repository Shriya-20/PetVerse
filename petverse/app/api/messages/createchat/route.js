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
      profile_picture: user2.profilePicture
        ? user2.profilePicture
        : defaultImage,
    });
    console.log("Successfully initialized chat");
    return NextResponse.json("Successfully initialized chat", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create chat room" });
  }
}
