import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    const db = await connectToDatabase();
    const userData = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    console.log(userData.pets);
    const posts = await db
      .collection("posts")
      .find({
        petId: { $nin: userData.pets.map((petId) => new ObjectId(petId)) },
      })
      .limit(40)
      .toArray();
    for (const post of posts) {
      console.log("POST");
      console.log(post);
      const petData = await db
        .collection("pet")
        .findOne({ _id: new ObjectId(post.petId) });

      post.profile_pic = petData.profilePicture
        ? petData.profilePicture
        : "https://firebasestorage.googleapis.com/v0/b/petverse-3fa63.firebasestorage.app/o/default_user_profile_pic.jpeg?alt=media&token=8fc7a77a-e2d1-499c-b986-ade30125b8bc";
      post.pet_name = petData.name;
      post.owner_id = petData.owner;
    }

    console.log(posts);
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 401 }
    );
  }
}
