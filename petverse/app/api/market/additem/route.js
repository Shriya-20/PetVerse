import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { uploadImageToServer } from "@/app/actions";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const itemName = formData.get("itemName");
    const itemPrice = formData.get("itemPrice");
    const itemDescription = formData.get("itemDescription");
    const itemQuantity = parseInt(formData.get("itemQuantity"), 10);
    const userId = formData.get("userId");
    const itemImage = formData.get("itemImage");

    const db = await connectToDatabase();
    const response = await db.collection("marketplaceitems").insertOne({
      sellerId: new ObjectId(userId),
      title: itemName,
      description: itemDescription,
      price: itemPrice,
      quantity: itemQuantity,
    });

    const path = `item/${response.insertedId}/pic.jpg`;

    const arrayBuffer = await itemImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const imageUrl = await uploadImageToServer(buffer, path, "image");

    await db
      .collection("marketplaceitems")
      .updateOne({ _id: response.insertedId }, { $push: { images: imageUrl } });

    return NextResponse.json("Successfully added item to market", {
      status: 200,
    });
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json(
      { error: "Failed to add new item" },
      { status: 500 }
    );
  }
}
