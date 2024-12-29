import { connectToDatabase } from "@/app/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { uploadImageToServer } from "@/app/actions";

export async function POST(req) {
  try {
    const {
      itemName,
      itemPrice,
      itemDescription,
      itemQuantity,
      itemArrayBuffer,
      userId,
    } = await req.json();
    console.log(userId);
    console.log(itemQuantity);

    const db = await connectToDatabase();
    const response = await db.collection("marketplaceitems").insertOne({
      sellerId: new ObjectId(userId),
      title: itemName,
      description: itemDescription,
      price: itemPrice,
      quantity: itemQuantity,
    });
    console.log("ITEM CREATED SUCCUSSFULLY");
    console.log(response);
    console.log(response.insertedId);
    const path = `item/${response.insertedId}/pic.jpg`;
    const imageUrl = await uploadImageToServer(itemArrayBuffer, path);
    await db
      .collection("marketplaceitems")
      .updateOne({ _id: response.insertedId }, { $push: { images: imageUrl } });
    console.log("Successfully uiploaded image in database");
    return NextResponse.json("Successfully added item to market", {
      status: 200,
    });
  } catch (error) {
    return Nextresponse.json(
      { error: "Failed to add new item" },
      { status: 401 }
    );
  }
}
