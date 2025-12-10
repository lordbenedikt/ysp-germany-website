<script setup lang="ts">
import FeaturesWidget from '@/components/landing/FeaturesWidget.vue';
import FooterWidget from '@/components/landing/FooterWidget.vue';
import HeroWidget from '@/components/ysp/HeroWidget.vue';
import HighlightsWidget from '@/components/landing/HighlightsWidget.vue';
import PricingWidget from '@/components/landing/PricingWidget.vue';
import TopbarWidget from '@/components/ysp/TopbarWidget.vue';

</script>

<template>
    <div id="home" class="ysp-wrapper overflow-hidden">
        <div class="bg-surface-0 dark:bg-surface-900" style="position: fixed; width: 100%; z-index: 100;">
            <div class="py-4 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
                <TopbarWidget/>
            </div>
        </div>
        <div class="spacer" style="height: 79px;"></div>
        <router-view></router-view>
    </div>
</template>
