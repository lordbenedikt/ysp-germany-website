<script setup lang="ts">

import {onMounted, reactive, Ref, ref} from 'vue';
import {Post, postConverter} from "@/models/post";
import { firestore, storage } from '@/firebase';
import { collection, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import {FileUploadSelectEvent, FileUploadUploadEvent} from 'primevue/fileupload';
import {getStorage, ref as fileRef, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
import {shortDateStr} from "@/util";

const props = defineProps({
    id: null,
});

const date = ref(new Date())
const title = ref(null);
const location = ref(null);
const eventText = ref(null);
const imageUrls = ref<string[]>([]);

async function submitEvent() {
    const eventsRef = collection(firestore, 'events')
    let docId = props.id != null && props.id.trim().length > 0 ? props.id : null;



    const event: Post = {
        title: title.value,
        date: date.value,
        body: eventText.value ?? '',
        location: location.value ?? '',
        photoUrls: imageUrls.value ?? [],
    };

    // If new event create ID
    docId ??= `${event.date.toISOString().split('T')[0]}-${event.title.replace(new RegExp('\s+'), '-').toLowerCase()}`;

    await setDoc(doc(eventsRef, docId), postConverter.toFirestore(event));
    alert('Event submitted successfully!');
}

async function uploadImages() {

}

async function loadEvent() {
    if (props.id == null || props.id.trim().length === 0) {
        return;
    }
    const docRef = doc(firestore, "events", props.id);
    const docSnap = await getDoc(docRef);
    const post = postConverter.fromFirestore(docSnap, '')
    title.value = post.title;
    date.value = post.date;
    location.value = post.location;
    eventText.value = post.body;
    imageUrls.value = post.photoUrls;
}

function onUpload(event: FileUploadUploadEvent) {
    for (let file in event.files) {
        // Handle each uploaded file (e.g., save URL to event)
        console.log('Uploaded file:', file);
    }
}

function onFileSelect(event: FileUploadSelectEvent) {
    event.files.forEach((file: File) => {
        let imgPath = `images/${shortDateStr()}-${file.name}`;
        const imgRef = fileRef(storage, imgPath);

        const metadata = {
            contentType: 'image/png',
        };
        file.arrayBuffer().then(blob => {
            uploadBytes(imgRef, blob, metadata).then((snapshot) => {
                console.log('Uploaded image to firebase storage');
                getDownloadURL(imgRef).then(url => {
                    imageUrls.value = [...imageUrls.value, url];
                });
            });
        });

    });
}

async function removePhoto(url) {
    imageUrls.value = imageUrls.value.filter(u => u !== url);
}

onMounted(() => loadEvent());
</script>

<template>
    <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2 flex flex-col">
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Event Info</div>
                <div class="flex flex-col gap-2">
                    <label for="event-title">Title</label>
                    <InputText id="event-title" type="text" v-model="title" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="event-date">Date</label>
                    <DatePicker id="event-date" :showIcon="true" :showButtonBar="true" v-model="date"></DatePicker>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="event-location">Location</label>
                    <InputText id="event-location" type="text" v-model="location" />
                </div>
            </div>
            <div class="card flex flex-col gap-4 flex-grow">
                <div class="font-semibold text-xl">Event Text</div>
                <div class="flex flex-col gap-2 flex-grow">
                    <Textarea class="flex-grow" style="min-height: 100px;" auto-resize id="section-1-content" type="text" v-model="eventText" />
                    <small>Write your event here.</small>
                </div>
            </div>

        </div>

        <div class="md:w-1/2 flex flex-col ">
            <div class="card flex-grow ">
                <div class="flex flex-row mb-4 justify-between">
                    <div class="font-semibold text-xl">Images</div>
                    <FileUpload class="ml-auto" multiple choose-label="Upload Images" choose-icon="pi pi-upload" mode="basic" @select="onFileSelect" customUpload auto severity="secondary" />
                </div>
                <div class="flex flex-row flex-wrap gap-y-2 justify-center p-5 border-gray border-1 border-width overflow-auto">
                    <div v-for="url in imageUrls" class="relative w-1/1 sm:w-1/2 md:w-1/1 lg:w-1/2">
                        <Button @click="removePhoto(url)" class="p-button-danger" style="position:absolute; right: 10px; bottom: 10px;" icon="pi pi-trash"></Button>
                        <img class="aspect-1/1 " :src="url" alt="Image" width="95%" style="margin: auto; object-fit: cover;"/>
                    </div>
                </div>
            </div>

            <div class="card">
                <Button class="mb-3" @click="submitEvent" :label="props.id ? 'Save Changes' : 'Submit Event'" :fluid="true"></Button>
                <Button class="p-button-outlined" @click="$router.push('/events')" label="To Public Events Site" :fluid="true"></Button>
            </div>
        </div>

    </div>
</template>


