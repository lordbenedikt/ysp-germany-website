<script setup lang="ts">
import { firestore, onAuthStateChangedHook } from '@/firebase';
import {onMounted, ref} from "vue";
import {collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {Post, postConverter} from "@/models/post";
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const user = ref(null)
const displayConfirmation = ref(false);
const toast = useToast();
const confirmPopup = useConfirm();
const deleteEventId = ref(null);

onMounted(onAuthStateChangedHook(user));

function deleteEventPrompt(eventId) {
    deleteEventId.value = eventId;
    openConfirmation();
}

function getDeleteEventName() {
    if (!deleteEventId.value) {
        return '';
    }
    const event = providedPostMap.value.find(entry => entry.id === deleteEventId.value);
    return event ? event.post.title : '';
}

function deleteEvent(eventId) {
    const docRef = doc(firestore, "events", eventId);
    deleteDoc(docRef)
    closeConfirmation();
    providedPostMap.value = providedPostMap.value.filter(entry => entry.id !== eventId);
}

function openConfirmation() {
    displayConfirmation.value = true;
}

function closeConfirmation() {
    displayConfirmation.value = false;
}

function confirm(event) {
    confirmPopup.require({
        target: event.target,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Save'
        },
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

function fetchEventsFromFirestore() {
    getDocs(collection(firestore, 'events').withConverter(postConverter))
        .then(querySnapshot => {
            const fetchedPosts: {id: string, post: Post}[] = [];
            querySnapshot.forEach(doc => {
                fetchedPosts.push({id: doc.id, post: doc.data()});
            });
            fetchedPosts.sort((a, b) => a.post.date.getTime() - b.post.date.getTime());
            providedPostMap.value = fetchedPosts;
        })
        .catch(error => {
            console.error("Error fetching events: ", error);
        });
}

let providedPostMap = ref<{id: string, post: Post}[]>([]);
fetchEventsFromFirestore();

</script>

<template>
    <div v-for="entry in providedPostMap" class="card m-0 lg:m-5">
        <div class="flex lg:flex-row flex-wrap m-0">
            <div class="md:w-1/2 lg:w-1/2 pe-5">
                <Image v-if="entry.post.photoUrls.length > 0"  :src="entry.post.photoUrls[0]" alt="event_image" :imageStyle="{ objectFit: 'cover' }" imageClass="aspect-4/4 rounded" preview/>
            </div>

            <div class="flex flex-col flex-grow md:w-1/2 lg:w-1/2">
                <div class="flex flex-row justify-between w-full mb-5 gap-1">
                    <div class="font-bold text-xl md:text-2xl lg:text-3xl flex-1">{{ entry.post.title }}</div>
                    <Button v-if="user" @click="deleteEventPrompt(entry.id)" icon="pi pi-trash" severity="danger"></Button>
                    <Button v-if="user" @click="$router.push('/edit_event/'+entry.id)" icon="pi pi-pencil" label="Bearbeiten"></Button>
                </div>
                <p class="text-lg md:text-xl lg:text-2xl"
                   v-for="p in (entry.post.body?.split('\n\n') ?? [])"
                   v-html="p">
                </p>
                <div class="mt-5 flex flex-row-reverse font-semibold text-md md:text-lg text-surface-400">
                    <span v-if="entry.post.date != null">{{ entry.post.date.toLocaleDateString() }}</span>
                    <span
                        v-if="entry.post.location != null && entry.post.location.trim().length > 0">{{ entry.post.location + ',&nbsp' }}</span>
                </div>
            </div>
        </div>
    </div>

    <Dialog :header="'Delete Event \'' + getDeleteEventName() + '\''" :visible="displayConfirmation" :style="{ width: '350px' }" :modal="true">
        <div class="flex items-center justify-center">
            <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
            <span>Are you sure you want to proceed?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" @click="closeConfirmation" text severity="secondary" />
            <Button label="Yes" icon="pi pi-check" @click="deleteEvent(deleteEventId)" severity="danger" outlined autofocus />
        </template>
    </Dialog>
</template>
