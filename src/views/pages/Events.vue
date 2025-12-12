<script setup lang="ts">
import FeaturesWidget from '@/components/landing/FeaturesWidget.vue';
import FooterWidget from '@/components/landing/FooterWidget.vue';
import HeroWidget from '@/components/ysp/HeroWidget.vue';
import HighlightsWidget from '@/components/landing/HighlightsWidget.vue';
import PricingWidget from '@/components/landing/PricingWidget.vue';
import TopbarWidget from '@/components/ysp/TopbarWidget.vue';

const events = [
    {
        id: 'd1n1ond3f',
        title: 'Besuch im Altenheim',
        body: 'Wir möchten den Senioren den Tag versüßen, indem wir ihnen etwas Gesellschaft leisten. Wir wollen Gespräche führen und Spiele spielen. ' +
            'Außerdem hoffen wir, etwas von ihrer Weisheit abzubekommen.',
        date: new Date('2026-01-12'),
        location: 'Altenheim zur Alten Mühle',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/ysp-germany-website.firebasestorage.app/o/images%2F2025-12-10-IMG-20250608-WA0017.jpg?alt=media&token=c4722596-6f72-4ab4-9253-1883447550dc',
    },
    {
        id: 'asdfagwvb324',
        title: 'Besuch im Altenheim',
        body: 'Wir möchten den Senioren den Tag versüßen, indem wir ihnen etwas Gesellschaft leisten. Außerdem hoffen wir, etwas von ihrer Weisheit abzubekommen.',
        date: new Date('2026-01-12'),
        location: 'Altenheim zur Alten Mühle',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/ysp-germany-website.firebasestorage.app/o/images%2F2025-12-10-IMG-20250303-WA0002.jpg?alt=media&token=cfee9cb4-2b44-46e9-9a34-a675e1341c65',
    },
];

</script>

<template>
    <div v-for="event in events" class="card m-0 lg:m-5">
        <div class="flex lg:flex-row flex-wrap m-0">
            <div class="md:w-1/2 lg:w-1/2 pe-5">
                <Image v-if="event.imageUrl"  :src="event.imageUrl" :alt="event.title" :imageStyle="{ objectFit: 'cover' }" imageClass="aspect-4/4 rounded" preview/>
            </div>

            <div class="flex flex-col flex-grow md:w-1/2 lg:w-1/2">
                <div class="flex flex-row justify-between w-full mb-5">
                    <div class="font-bold text-xl md:text-2xl lg:text-3xl">{{ event.title }}</div>
                    <Button @click="$router.push('/edit_report/'+event.id)" icon="pi pi-pencil" label="Bearbeiten"></Button>
                </div>
                <p class="text-lg md:text-xl lg:text-2xl" v-for="p in (event.body?.split('\n\n') ?? [])">{{ p }}</p>
                <div class="mt-5 flex flex-row-reverse font-semibold text-md md:text-lg text-surface-400">
                    <span v-if="event.date != null">{{ event.date.toLocaleDateString() }}</span>
                    <span
                        v-if="event.location != null && event.location.trim().length > 0">{{ event.location + ',&nbsp' }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
