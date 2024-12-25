import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const pet = await req.json();
    console.log(pet);
    console.log("successfully acquired the pet details from frontend");
    const db = await connectToDatabase();
    console.log("successfully connected to database");
    const result = await db.collection("pet").insertOne({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      location: pet.location,
      owner: new ObjectId(pet.userid),
    });

    const petId = result.insertedId;
    console.log("added pet successfully with id:", petId);

    await db.collection("users").updateOne(
      { _id: new ObjectId(pet.userid) },
      {
        $push: { pets: petId },
      }
    );
    console.log("successfully added pet to user profile");

    return NextResponse.json("successfully added pet", { status: 200 });
  } catch (error) {
    console.log("Failed to add pet", error);
    return NextResponse.json("Failed to add pet", { status: 400 });
  }
}
