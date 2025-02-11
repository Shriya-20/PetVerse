import { database } from "@/app/_backend/firebaseConfig";
import { ref, push, serverTimestamp, update, get } from "firebase/database";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import defaultImage from "@/public/default_user_profile_pic.jpeg";
import { connectToDatabase } from "@/app/utils/db";

export async function POST(req) {
  try {
    const db = await connectToDatabase();
    const { userId, activeChat, message, type } = await req.json();
    console.log(message);
    if (!message.trim()) {
      return NextResponse.json("No Message to send", { status: 200 });
    }

    const messageRef = ref(
      database,
      `messages/${[userId, activeChat].sort().join("_")}`
    );
    push(messageRef, {
      sender: userId,
      content: message,
      type: type,
      timestamp: serverTimestamp(),
    });
    const user2 = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    const lastMessage = message.startsWith(
      "https://firebasestorage.googleapis.com"
    )
      ? "image.jpg"
      : message;

    update(ref(database, `chats/${userId}/${activeChat}`), {
      last_message: lastMessage,
      timestamp: serverTimestamp(),
    });

    const snapshot = await get(ref(database, `chats/${activeChat}/${userId}`));
    const chatdata = snapshot.val() || {};
    console.log(chatdata);

    const chatUpdateData = {
      last_message: lastMessage,
      name: user2.username,
      timestamp: serverTimestamp(),
    };
    if (user2.profilePicture) {
      chatUpdateData.profile_picture = user2.profilePicture;
    }
    if (chatdata.unread_messages) {
      chatUpdateData.unread_messages = chatdata.unread_messages + 1;
    } else {
      chatUpdateData.unread_messages = 1;
    }
    update(ref(database, `chats/${activeChat}/${userId}`), chatUpdateData);

    console.log("MESSAGE SENT");
    return NextResponse.json("Successfully send message", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 403 }
    );
  }
}
