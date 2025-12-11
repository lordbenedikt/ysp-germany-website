<script setup>
import FloatingConfigurator from "@/components/FloatingConfigurator.vue";
import { auth } from '@/firebase.js';
import { useRouter } from 'vue-router';
import {onMounted, ref} from "vue";
import {onAuthStateChanged} from "firebase/auth";
import YspLogo from "@/components/ysp/YspLogo.vue";

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
    return route === useRouter().currentRoute.value.path;
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
</script>

<template>
    <a class="flex items-center" href="#">
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
    <div class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden text-nowrap md:flex absolute md:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
        <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col md:flex-row cursor-pointer my-5 md:my-0 gap-0 gap-y-8">
            <li>
                <router-link to="/about" :class="linkClass('/about')">
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
            <li v-if="true || user" class="lg:block">
                <router-link to="/" :class="linkClass('/')">
                    <span>Admin</span>
                </router-link>
            </li>
        </ul>
    </div>
    <FloatingConfigurator style="right:120px; top: 20px; z-index: 300;"/>
</template>
