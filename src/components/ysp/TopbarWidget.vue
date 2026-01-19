<script setup>
import FloatingConfigurator from "@/components/FloatingConfigurator.vue";
import {auth, signOut} from '@/firebase.js';
import {RouterLink, useRouter} from 'vue-router';
import {onMounted, ref} from "vue";
import {onAuthStateChanged} from "firebase/auth";
import YspLogo from "@/components/ysp/YspLogo.vue";
import AppConfigurator from "@/layout/AppConfigurator.vue";
import {useLayout} from "@/layout/composables/layout";

const user = ref(null)

onMounted(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            // User is signed in
            user.value = firebaseUser;
            console.log('User is logged in:', firebaseUser.email);
        } else {
            // User is signed out
            user.value = null;
            console.log('No user is logged in');
        }
    });
});


function smoothScroll(id) {
    document.body.click();
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function isActiveRoute(route) {
    let currentPath = useRouter().currentRoute.value.path
    return route === currentPath|| route.alias === currentPath;
}

function linkClass(route) {
    return ['px-8 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl', { 'bg-surface-200 dark:bg-surface-700': isActiveRoute(route) }];
}


const router = useRouter();

router.afterEach(() => {
    // If your menu closes on body click, keep this.
    // Otherwise call a direct close method (see other options).
    document.body.click();
});

const { isDarkTheme, toggleDarkMode } = useLayout();
</script>

<template>
    <a class="flex items-center flex-1" href="#">
        <YspLogo fillColor="var(--p-primary-color)" width="60px" height="60px" ></YspLogo>
    </a>
    <Button
        class="md:!hidden"
        text
        severity="secondary"
        rounded
        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
    >
        <i class="pi pi-bars !text-2xl"></i>
    </Button>
    <div class="items-center grow justify-between hidden text-nowrap md:flex absolute md:static w-full left-0 top-full px-12 lg:px-0 z-20 bg-surface-0 dark:bg-surface-900 md:bg-transparent rounded-border">
        <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col md:flex-row cursor-pointer my-5 md:my-0 gap-0 gap-y-8">
            <li>
                <router-link to="/" :class="linkClass('/')">
                    <span>Über uns</span>
                </router-link>
            </li>
            <li>
                <router-link to="/reports" :class="linkClass('/reports')">
                    <span>Berichte</span>
                </router-link>
            </li>
            <li>
                <router-link to="/events" :class="linkClass('/events')">
                    <span>Aktuelles</span>
                </router-link>
            </li>
            <li v-if="user" class="lg:block">
                <router-link to="/new_report" :class="linkClass('/new_report')">
                    <span>Admin</span>
                </router-link>
            </li>
            <li v-if="user" class="md:hidden lg:block">
                <span @click="signOut" :class="linkClass('none')">Sign Out</span>
            </li>
        </ul>
    </div>
    <div class="fixed flex gap-4 top-8 right-24" style="z-index: 100;">
        <Button type="button" @click="toggleDarkMode" rounded :icon="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary" />
        <div class="relative">
            <Button
                icon="pi pi-palette"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                type="button"
                rounded
            />
            <AppConfigurator />
        </div>
    </div>

</template>
