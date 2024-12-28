"use server";
import { storage } from "@/app/_backend/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";

{
  /* To upload image taken from imput */
}
export async function uploadImageToServer(imageBuffer, path) {
  try {
    const storageRef = ref(storage, path);
    const metadata = { contentType: "image/jpeg" };
    const snapshot = await uploadBytes(storageRef, imageBuffer, metadata);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function deleteFile(path) {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return 1;
  } catch (error) {
    throw error;
  }
}

export async function deleteFolder(path) {
  try {
    const folderRef = ref(storage, path);
    console.log("Got storage REF");

    const dir = await listAll(folderRef);
    console.log(dir.items);
    console.log(Array.isArray(dir.items));
    console.log(dir.prefixes);

    if (dir.items && Array.isArray(dir.items)) {
      for (const fileRef of dir.items) {
        const filePath = fileRef._location.path_;
        await deleteFile(filePath);
      }
    }

    {
      /* IF the folder has subfolders */
      /* Don't know if this works */
    }

    // if (dir.prefixes && Array.isArray(dir.prefixes)) {
    //   for (const folderRef of dir.prefixes) {
    //     await deleteFolder(folderRef.fullPath);
    //   }
    // }

    console.log("DELETED OB");
    return 1;
  } catch (error) {
    console.log("ERROR IN DELETEING PET: " + error);
    throw error;
  }
}
