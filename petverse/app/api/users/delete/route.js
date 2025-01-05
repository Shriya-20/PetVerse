import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { handleDeleteUser } from "@/app/_backend/auth";
import { deleteFolder } from "@/app/actions";
import { database } from "@/app/_backend/firebaseConfig";
import { ref, remove, get, update } from "firebase/database";
import { ContactsOutlined } from "@mui/icons-material";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    const db = await connectToDatabase();

    // Delete user from firebase auth
    await handleDeleteUser();

    // Delete pet data from firebase storage
    const userData = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    if (userData.pets) {
      for (const pet of userData.pets) {
        const petId = pet.toString();
        await deleteFolder(`${petId}`);
      }
    }

    // Delete user items data from firebase storage
    const userItems = await db
      .collection("marketplaceitems")
      .find({ sellerId: new ObjectId(userId) }, { _id: 1 })
      .toArray();
    if (userItems.len != 0) {
      for (const userItem of userItems) {
        const itemId = userItem._id;
        await deleteFolder(`item/${itemId}`);
      }
    }

    // Delete user profile data from firebase storage
    await deleteFolder(`users/${userId}`);

    // Delete user, user pets and user items from db
    await db.collection("users").deleteOne({ _id: new ObjectId(userId) });
    await db.collection("pet").deleteMany({ owner: new ObjectId(userId) });
    await db
      .collection("marketplaceitems")
      .deleteMany({ sellerId: new ObjectId(userId) });

    //Delete user chats from firebase realtime database and update chatlist
    const defaultProfilePic =
      "https://firebasestorage.googleapis.com/v0/b/petverse-3fa63.firebasestorage.app/o/default_user_profile_pic.jpeg?alt=media&token=8fc7a77a-e2d1-499c-b986-ade30125b8bc";

    const userChatRef = ref(database, `chats/${userId}`);

    try {
      const snapshot = await get(userChatRef);
      console.log(snapshot.val());
      if (!snapshot.exists()) {
        console.log("No chats to delete");
        return;
      }

      const otherUsers = Object.keys(snapshot.val());
      await remove(userChatRef);
      console.log("Successfully deleted user chats");

      const updates = {};
      otherUsers.forEach((otherUserId) => {
        updates[`chats/${otherUserId}/${userId}/name`] = "Deleted User";
        updates[`chats/${otherUserId}/${userId}/profile_picture`] =
          defaultProfilePic;
      });

      await update(ref(database), updates);
      console.log("Successfully updated other users chat data");
    } catch (error) {
      console.log("Failed to deleted stuff");
      console.log(error);
    }

    return NextResponse.json("Successfully deleted user", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.code }, { status: 401 });
  }
}
