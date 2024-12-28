import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const pet = await req.json();
    const db = await connectToDatabase();
    // Add pet to pets collection
    const result = await db.collection("pet").insertOne({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      location: pet.location,
      owner: new ObjectId(pet.userid),
    });

    const petId = result.insertedId;

    // Add pet Id to the user pets
    await db.collection("users").updateOne(
      { _id: new ObjectId(pet.userid) },
      {
        $push: { pets: petId },
      }
    );

    return NextResponse.json(petId, { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to add pet", { status: 400 });
  }
}
