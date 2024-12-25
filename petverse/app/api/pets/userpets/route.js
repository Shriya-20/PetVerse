import { connectToDatabase } from "@/app/utils/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;
    const db = await connectToDatabase();
    const userPets = await db
      .collection("pets")
      .find({ owner: userId })
      .toArray();
    return new Response(JSON.stringify(userPets), { status: 200 });
  } catch (error) {
    console.error("Error getting pet data", error);
    return new Response(
      JSON.stringify({ error: "Error getting user pet data" }),
      { status: 500 }
    );
  }
}
