import { database } from "@/app/_backend/firebaseConfig";
import { ref, push, serverTimestamp, update } from "firebase/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, activeChat, message } = await req.json();
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
      timestamp: serverTimestamp(),
    });

    update(ref(database, `chats/${userId}/${activeChat}`), {
      last_message: message,
      timestamp: serverTimestamp(),
    });
    update(ref(database, `chats/${activeChat}/${userId}`), {
      last_message: message,
      timestamp: serverTimestamp(),
    });

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
