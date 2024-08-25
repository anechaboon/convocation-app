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
        <p class="mr-3 admin-login" @click="router.push('/login');">ADMIN</p>
    </div>
    <div class="container rounded bg-white min-height-md" style="width: 35%; min-height: 28em;">
        <div class="justify-content-center pt-5">
            <b>
                <h3 style="color: #65a2d9">
                    Welcome to Session
                </h3>
            </b>
        </div>
        <div class="row p-3">
            <div class="d-flex justify-content-center pt-5">
                <button class="btn btn-primary w-btn-14" @click="spectatorStore.setOpenModalRegister(true)">Register</button>
            </div>
            <div class="d-flex justify-content-center pt-3">
                <button class="btn btn-primary w-btn-14" @click="router.push('/spectator-list');">Spectator Information</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .admin-login{
        padding-right: 25px; 
        color: white;
    }
    .w-btn-14{
        width: 14em;
    }
</style>