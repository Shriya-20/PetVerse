import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await req.json();
    const db = await connectToDatabase();
    console.log(user);

    await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(user.userId) },
        { $set: { location: user.location } }
      );
    console.log("successfully updated user location");
    return NextResponse.json("Successfult changed user location", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error in updating the user location", {
      status: 401,
    });
  }
}
