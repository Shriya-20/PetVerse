import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const { value, field, petId } = data;
    const db = await connectToDatabase();

    await db
      .collection("pet")
      .updateOne({ _id: new ObjectId(petId) }, { $set: { [field]: value } });
    console.log("Successfully updated details");
    return NextResponse.json(`Successfully updated ${field}`, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update details" },
      { status: 200 }
    );
  }
}
