import { connectToDatabase } from "@/app/utils/db";
import { auth } from "@/app/_backend/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

async function handleSignUpWithEmail(userName, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const dateJoined = new Date().toISOString();
    const user = {
      username: userName,
      email: email,
      dateJoined: dateJoined,
    };
    return user;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

export async function POST(req) {
  try {
    console.log("Post function called.");
    const { userName, email, password } = await req.json();
    console.log("Extracted data from request");
    const newUser = await handleSignUpWithEmail(userName, email, password);
    console.log("Completed firebase SignUP");

    const db = await connectToDatabase();
    console.log("connected to database");
    await db.collection("users").insertOne(newUser);
    console.log("inserted user into database");

    console.log("Sucessfully inserted user into database");
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
