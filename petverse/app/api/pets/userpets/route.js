import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const userId = await req.json();
    const db = await connectToDatabase();
    const userPets = await db
      .collection("pet")
      .find({ owner: new ObjectId(userId) })
      .toArray();

    return new Response(JSON.stringify(userPets), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error getting user pet data" }),
      { status: 500 }
    );
  }
}
