import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const pet = await req.json();
    console.log(pet);
    const db = await connectToDatabase();
    const petData = await db
      .collection("pet")
      .findOne({ _id: new ObjectId(pet.id) });
    console.log(petData);
    console.log("Successfully fetched pet data");
    return NextResponse.json(petData, { status: 200 });
  } catch (error) {
    return NextResponse("Error in fetching pet data", { status: 401 });
  }
}
