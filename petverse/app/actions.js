"use server";
import { readFileSync } from "fs";
import path from "path";
import { storage } from "@/app/_backend/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

// For uploading from local project directory
export async function uploadImageToServer2() {
  try {
    const imagePath = "@/public/logindoggy.jpg";
    path.join(process.cwd(), "public", "default_user_profile_pic.jpeg");
    // const imagePath = "public/logindoggy.jpg";

    const imageBuffer = readFileSync(imagePath);

    const storageRef = ref(storage, `images.jpeg`);
    const metadata = { contentType: "image/jpeg" };
    const snapshot = await uploadBytes(storageRef, imageBuffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

{
  /* To upload a image that has a url */
}
export async function uploadImageToServer3() {
  const storageRef = ref(storage, "image.jpg");

  const response = await fetch(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s"
  );
  console.log(response.status);
  const blob = await response.blob();

  const uploadTask = await uploadBytes(storageRef, blob);
  console.log("File uploaded sucessfully", uploadTask);

  const imageURL = await getDownloadURL(storageRef);
  console.log("File available at: ", imageURL);
}

{
  /* For uploading images that we get as input from user */
}

/*
  
  // Client-side (in your component)
  'use client';
  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  import { handleSignInWithEmail } from "@/firebase";
  import { uploadImageToServer } from './actions'; // Import your server action
  
  async function handleLogin(e) {
    e.preventDefault();
    try {
      await handleSignInWithEmail(email, password);
  
      const fileInput = document.getElementById("image-upload");
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        throw new Error("No image selected");
      }
  
      const file = fileInput.files[0];
  
      // Check if the file is an image (important validation)
      if (!file.type.startsWith('image/')) {
        throw new Error("Selected file is not an image");
      }
  
      // Use FileReader correctly with a Promise
      const arrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error); // Handle errors
        reader.readAsArrayBuffer(file);
      });
  
      const imageUrl = await uploadImageToServer(arrayBuffer); // Pass the ArrayBuffer to the server action
  
      console.log("File uploaded successfully", imageUrl);
      router.push("/petverse/messages");
      console.log("Login Successful");
    } catch (error) {
      console.error(`Error while Logging In: ${error}`);
      // Display error to the user
      alert(error.message); // Simple alert, replace with better UI
    }
  }
  
  // In your JSX:
  <input type="file" id="image-upload" accept="image/jpeg, image/png" />
  <button onClick={handleLogin}>Login</button>
  
  // Server action (app/actions.js)
  'use server';
  import { storage } from "@/firebase";
  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
  
  export async function uploadImageToServer(imageBuffer) {
    try {
      if (!(imageBuffer instanceof ArrayBuffer)) {
        throw new Error("Invalid image buffer received by server");
      }
      const storageRef = ref(storage, `images/${Date.now()}.jpg`);
      const metadata = { contentType: 'image/jpeg' }; // Or determine from file type
      const snapshot = await uploadBytes(storageRef, imageBuffer, metadata);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
  
  */
