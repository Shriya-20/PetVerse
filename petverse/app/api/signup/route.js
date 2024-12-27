import { connectToDatabase } from "@/app/utils/db";
import { handleSignUpWithEmail } from "@/app/_backend/auth";

export async function POST(req) {
  try {
    const { userName, email, password } = await req.json();
    const newUser = await handleSignUpWithEmail(userName, email, password);

    const db = await connectToDatabase();
    await db.collection("users").insertOne(newUser);
    return new Response(JSON.stringify({ success: "true" }), { status: 200 });
  } catch (error) {
    console.error("Error during Signup: ", error.message);
    return new Response(
      JSON.stringify({
        message: "Sign Up failed. don't try again",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
