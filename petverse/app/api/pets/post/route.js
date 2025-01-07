import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { ContactPage } from "@mui/icons-material";

export async function POST(req) {
  try {
    const { imageUrl, petId, caption } = await req.json();
    const db = await connectToDatabase();
    const petData = await db
      .collection("pet")
      .findOne({ _id: new ObjectId(petId) });
    const currentDate = new Date();
    const insert = {
      pet_id: new ObjectId(petId),
      pet_name: petData.name,
      imageUrl: imageUrl,
      timestamp: currentDate,
      likes: 0,
    };
    if (petData.profilePicture) {
      insert["pet_profile_pic"] = petData.profilePicture;
    }
    if (caption !== null) {
      insert["caption"] = caption;
    }
    await db.collection("posts").insertOne(insert);
    console.log("Sucessfully posted");
    return NextResponse.json("Successfully created post", { status: 200 });
  } catch (error) {
    console.log(error);
    console.log("Error in creating post");
    return NextResponse.json(
      { error: "Failed to created post" },
      { status: 401 }
    );
  }
}
