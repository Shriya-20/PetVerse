import { database } from "@/app/_backend/firebaseConfig";
import { ref, onValue, update, child, get } from "firebase/database";
import { NextResponse } from "next/server";

export async function updateChatData() {
  return;
}

export async function POST(req) {
  try {
    const { userId, activeChat } = await req.json();
    const dbRef = ref(database);
    const snapshot = await get(
      child(dbRef, `messages/${[userId, activeChat].sort().join("_")}`)
    );

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);
      return NextResponse.json(data, { status: 200 });
    } else {
      console.log("No data available");
      return NextResponse.json([], { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch chat" },
      { status: 401 }
    );
  }
}
