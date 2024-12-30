import { database } from "@/app/_backend/firebaseConfig";
import { ref, onValue, update } from "firebase/database";
import { NextResponse } from "next/server";

export async function updateChatData() {
  return;
}

export async function POST(req) {
  try {
    const { user1Id, user2Id } = await req.json();
    const db = database;
    const chatDataRef = ref(db, `messages/${user1Id}_${user2Id}`);
    onValue(chatDataRef, (snapshot) => {
      const data = snapshot.val();
      updateChatData(post);
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch chat" },
      { status: 401 }
    );
  }
}
