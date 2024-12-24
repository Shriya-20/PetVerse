import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const user_id = await req.json();
    console.log(user_id);
    const db = await connectToDatabase();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user_id) });
    console.log(user);
    console.log(user._id);
    console.log("data fetched sucessfully");
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Failed to connect to database");
    console.log(error);
    return new Response("Error in getting data from database", { status: 500 });
  }
}
