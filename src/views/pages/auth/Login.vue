<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import {onMounted, ref} from 'vue';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase.js';
import router from "@/router";
import YspLogo from "@/components/ysp/YspLogo.vue";
import {createRouter as $router} from "vue-router";

const email = ref('');
const password = ref('');
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

function signIn() {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('Signed in:', user);
            router.push('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in:', errorCode, errorMessage);
            // Handle sign-in errors here
        });
}

function logOut() {
    auth.signOut().then(() => {
        router.push('/about');
    });
}
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <YspLogo fill-color="var(--p-primary-color)" src="/ysp/images/logo_dove.jpeg" alt="logo" width="80px" height="80px" class="mb-4 w-30 shrink-0 mx-auto" />
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">YSP Germany Admin Panel</div>
                        <span v-if="!user" class="text-muted-color font-medium">Sign in to continue</span>
                    </div>

                    <div v-if="user">
                        <div class="text-xl font-semibold">You are currently signed on.</div>
                        <Button @click="logOut" fluid="false">Sign Out</Button>
                    </div>

                    <div v-if="!user">
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <Button label="Sign In" class="w-full mb-4" @click="signIn"></Button>
                        <Button @click="router.push('/about')" label="To Public Site" class="w-full p-button-outlined"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
