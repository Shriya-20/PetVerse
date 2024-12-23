import { connectToDatabase } from "@/app/utils/db";

async function fetchUsers() {
  try {
    const db = await connectToDatabase();
    const users = await db.collection("users").find().toArray();
    console.log("fetched users: ", users);
  } catch (error) {
    console.error("Failed to connect to database");
    console.log(error);
  }
}

fetchUsers();
