<template>
    <FileUpload
        name="image"
        accept="image/*"
        customUpload
        :auto="true"
        @uploader="onUpload"
    />
</template>

<script setup>

import 'primevue/fileupload';
import { storage } from '@/firebase.js';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const onUpload = async (event) => {
    const file = event.files[0];
    if (!file) return;

    // Create a reference in Firebase Storage
    const imageRef = storageRef(storage, `images/${file.name}`);

    // Upload file
    try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        // Do something with the URL (e.g., save to DB, display)
        console.log("Image URL:", url);
    } catch (error) {
        console.error("Upload error:", error);
    }
};
</script>
