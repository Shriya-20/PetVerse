import { database } from "@/app/_backend/firebaseConfig";
import { NextResponse } from "next/server";
import { ref, child, get } from "firebase/database";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `chats/${userId}`));

    if (snapshot.exists()) {
      const data = snapshot.val();
      return NextResponse.json(data, { status: 200 });
    } else {
      console.log("No data available");
      return NextResponse.json([], { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error in fetching chats" },
      { status: 401 }
    );
  }
}
