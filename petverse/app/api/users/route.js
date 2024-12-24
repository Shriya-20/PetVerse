import { connectToDatabase } from "@/app/utils/db";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const users = await db.collection("users").find().toArray();
    console.log("data fetched sucessfully");
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Failed to connect to database");
    console.log(error);
    return new Response("Error in getting data from database", { status: 500 });
  }
}
