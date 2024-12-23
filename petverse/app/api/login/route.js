import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import jwt from "jsonwebtoken";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/_backend/firebaseConfig";

const SECRET_KEY = process.env.SESSION_SECRET_KEY;

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const db = await connectToDatabase();
    console.log("successfully connected to database");
    const user = await db.collection("users").findOne({ email });
    console.log("succussfully retrived the user data");

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log("sucessfully created jwt");
    console.log(token);

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.log(`Error Code: ${error.code}  Error message: ${error.message}`);
    return NextResponse.json("Error in loggin in", { status: 500 });
  }
}
