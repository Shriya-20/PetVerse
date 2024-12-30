import { database } from "@/app/_backend/firebaseConfig";
import { NextResponse } from "next/server";
import { ref, child, get } from "firebase/database";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    const dbRef = ref(database);
    get(child(dbRef, `chats/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return NextResponse.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Error in fetching chats" },
      { status: 401 }
    );
  }
}
