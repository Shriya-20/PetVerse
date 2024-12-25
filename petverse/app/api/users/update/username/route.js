import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await req.json();
    const db = await connectToDatabase();

    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(user.id) }, { $set: { name: user.name } });
    console.log("successfully updated username");
    return NextResponse.json("Successfult changed username", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error in updating the username", { status: 401 });
  }
}
