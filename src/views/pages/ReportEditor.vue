<script setup lang="ts">

import {onMounted, reactive, Ref, ref} from 'vue';
import {Post, postConverter} from "@/models/post";
import { firestore, storage } from '@/firebase';
import { collection, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import firebase from "firebase/compat/app";
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import ImageUpload from '@/components/ImageUpload.vue';
import {FileUploadSelectEvent, FileUploadUploadEvent} from 'primevue/fileupload';
import {getStorage, ref as fileRef, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
import {shortDateStr} from "@/util";

const props = defineProps({
    id: null,
});

const date = ref(new Date())
const title = ref(null);
const location = ref(null);
const reportText = ref(null);
const imageUrls = ref<string[]>([]);

async function submitReport() {
    const reportsRef = collection(firestore, 'reports')
    const report: Post = {
        title: title.value,
        date: date.value,
        body: reportText.value ?? '',
        location: location.value ?? '',
        photoUrls: imageUrls.value ?? [],
    };
    let docId = props.id != null && props.id.trim().length > 0 ? props.id : null;
    docId ??= `${report.date.toISOString().split('T')[0]}-${report.title.replace(new RegExp('\s+'), '-').toLowerCase()}`;
    await setDoc(doc(reportsRef, docId), postConverter.toFirestore(report));
    alert('Report submitted successfully!');
}

async function uploadImages() {

}

async function loadReport() {
    if (props.id == null || props.id.trim().length === 0) {
        return;
    }
    const docRef = doc(firestore, "reports", props.id);
    const docSnap = await getDoc(docRef);
    const post = postConverter.fromFirestore(docSnap, '')
    title.value = post.title;
    date.value = post.date;
    location.value = post.location;
    reportText.value = post.body;
    imageUrls.value = post.photoUrls;
}

function onUpload(event: FileUploadUploadEvent) {
    for (let file in event.files) {
        // Handle each uploaded file (e.g., save URL to report)
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
    await deleteObject(fileRef(storage, url))
    imageUrls.value = imageUrls.value.filter(u => u !== url);
}

onMounted(() => loadReport());
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
                <div class="font-semibold text-xl">Report Text</div>
                <div class="flex flex-col gap-2 flex-grow">
                    <Textarea class="flex-grow" style="min-height: 100px;" auto-resize id="section-1-content" type="text" v-model="reportText" />
                    <small>Write your report here.</small>
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
                <Button @click="submitReport" :label="props.id ? 'Save Changes' : 'Submit Report'" :fluid="true"></Button>
            </div>
        </div>

    </div>
</template>

<script setup>

</script>


