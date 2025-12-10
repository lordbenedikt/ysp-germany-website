<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';
import YspLogo from "@/components/ysp/YspLogo.vue";
import {auth} from "@/firebase";
import router from "@/router";
import {onMounted, ref} from "vue";
import {onBeforeRouteLeave} from "vue-router";

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();

function signOut() {
    auth.signOut().then(() => {
    router.push('/about');

    });
}

const heading = ref('');

// onMounted(() => {
//     heading.value = getCurrentRouteName();
// });
//
// onBeforeRouteLeave(() => {
//     heading.value = getCurrentRouteName();
// });

function getCurrentRouteName() {
    return router.currentRoute.value.name;
}
</script>

<template>
    <div class="layout-topbar">

        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
                <i class="pi pi-bars p-3"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <ysp-logo fill-color="var(--p-primary-color)"/>

                <span class="text-nowrap">Admin Panel {{heading}}</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button"
                        class="layout-topbar-action layout-topbar-action-highlight"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div>
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content" style="align-items: center;">

                    <Button @click="signOut" class="p-button-outlined" icon="pi pi-sign-out" label="Sign Out" />

                </div>
            </div>
        </div>
    </div>
</template>
