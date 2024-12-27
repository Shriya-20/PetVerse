import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const user_id = await req.json();
    const db = await connectToDatabase();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user_id) });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Error in getting data from database", { status: 500 });
  }
}
