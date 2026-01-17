<script setup>

import AppMenuItem from './AppMenuItem.vue';
import {onMounted, ref} from "vue";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/firebase";
import router from "@/router";

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
            router.push('/auth/login');
            console.log('No user is logged in');
        }
    });
});

const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'New Report', icon: 'pi pi-fw pi-pencil', to: '/new_report' },
            { label: 'New Event', icon: 'pi pi-fw pi-sparkles', to: '/new_event' },
            { label: 'Public Site', icon: 'pi pi-fw pi-home', to: '/' },
        ],
    },
]);
</script>

<template>
    <ul v-if="user" class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
