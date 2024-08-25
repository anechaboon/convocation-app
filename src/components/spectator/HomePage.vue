<script setup>
import { useSpectatorStore } from "@/store/spectator";
import RegisterForm from './RegisterFrom.vue'
import { useRouter } from 'vue-router';
const spectatorStore = useSpectatorStore();
spectatorStore.setOpenModalRegister(false)
const router = useRouter();
</script>
<template>
    <RegisterForm />
    <div class="d-flex justify-content-end">
        <p class="mr-3" style="padding-right: 15px;" @click="router.push('/login');">Admin</p>
    </div>
    <div class="container rounded bg-white min-height-md" style="width: 70%;">
        <div class="row p-3">
            <div class="d-flex justify-content-center pt-5">
                <button class="btn btn-primary" @click="spectatorStore.setOpenModalRegister(true)">Register</button>
            </div>
            <div class="d-flex justify-content-center pt-5">
                <button class="btn btn-primary" @click="router.push('/spectator-list');">View Spectator</button>
            </div>
        </div>
    </div>
</template>

