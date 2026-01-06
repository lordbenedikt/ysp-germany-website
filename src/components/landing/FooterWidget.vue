<template>
    <div class="py-6 px-6 mx-0 mt-20 lg:mx-20">
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 md:col-span-2">
                <a class="flex flex-wrap items-center justify-center md:justify-start md:mb-0 mb-4 cursor-pointer">
                    <YspLogo fill-color="var(--p-primary-color)" style="width:80px;height:80px;"/>
                </a>
            </div>

            <div class="col-span-12 md:col-span-10">
                <div class="grid grid-cols-12 gap-8 text-center md:text-left">

                    <div class="col-span-12 md:col-span-3">
                        <h4 class="font-medium text-2xl leading-normal mb-4 text-surface-900 dark:text-surface-0">Community</h4>
                        <a class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100" href="https://www.instagram.com/ysp.germany/" target="_blank">Instagram</a>
                    </div>

                    <div class="col-span-12 md:col-span-3">
                        <h4 class="font-medium text-2xl leading-normal mb-4 text-surface-900 dark:text-surface-0">Verein</h4>
                        <a class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">Satzung</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import YspLogo from "@/components/ysp/YspLogo.vue";
</script>
