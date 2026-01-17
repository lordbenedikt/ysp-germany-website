<script setup lang="ts">
import {onMounted, ref} from "vue";
import '@/models/post';
import {Post, postConverter} from "@/models/post";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { firestore, onAuthStateChangedHook } from '@/firebase';
const user = ref(null)

onMounted(onAuthStateChangedHook(user));

const galleriaResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '960px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);

let providedPostMap = ref<{id: string, post: Post}[]>([]);

function fetchReportsFromFirestore() {
    getDocs(collection(firestore, 'reports').withConverter(postConverter))
        .then(querySnapshot => {
            const fetchedPosts: {id: string, post: Post}[] = [];
            querySnapshot.forEach(doc => {
                fetchedPosts.push({id: doc.id, post: doc.data()});
            });
            fetchedPosts.sort((a, b) => b.post.date.getTime() - a.post.date.getTime());
            providedPostMap.value = fetchedPosts;
        })
        .catch(error => {
            console.error("Error fetching reports: ", error);
        });
}

const carouselResponsiveOptions = ref([
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]);

fetchReportsFromFirestore();
</script>

<style>

</style>

<template>
    <div v-for="entry in providedPostMap" class="card m-0 lg:m-5">
        <div class="flex lg:flex-row flex-wrap m-0">
            <Carousel v-if="entry.post.photoUrls.length > 0" class="-mx-5 md:me-2 md:w-1/2 lg:w-1/2" :value="entry.post.photoUrls.map(url => ({ itemImageSrc: url }))" :numVisible="1" :numScroll="1" :responsiveOptions="carouselResponsiveOptions">
                <template #item="slotProps">
                    <div class="border border-surface-200 dark:border-surface-700 rounded lg:m-2 p-2 lg:p-4">
                        <Image :src="slotProps.data.itemImageSrc" :alt="slotProps.data.name" :imageStyle="{ objectFit: 'cover' }" imageClass="aspect-4/4 rounded" preview/>
                    </div>
                </template>
            </Carousel>
            <div class="flex flex-col flex-grow md:w-1/2 lg:w-1/2">
                <div class="flex flex-row justify-between w-full mb-5">
                    <div class="font-bold text-xl md:text-2xl lg:text-3xl">{{entry.post.title}}</div>
                    <Button v-if="user" @click="$router.push('/edit_report/'+entry.id)" icon="pi pi-pencil" label="Bearbeiten"></Button>
                </div>
                <p class="text-lg md:text-xl lg:text-2xl" v-for="paragraph in (entry.post.body?.split('\n\n') ?? [])">{{paragraph}}</p>
                <div class="mt-5 flex flex-row-reverse font-semibold text-md md:text-lg text-surface-400">
                    <span v-if="entry.post.date != null">{{entry.post.date.toLocaleDateString()}}</span>
                    <span v-if="entry.post.location != null && entry.post.location.trim().length > 0">{{entry.post.location + ',&nbsp'}}</span>
                </div>
            </div>
        </div>

    </div>
    <div class="end-of-page"></div>
</template>
