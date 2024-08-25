<script setup>
import { useUsersStore } from "@/store/users";
import RegisterForm from './RegisterFrom.vue'
import { useRouter } from 'vue-router';
const usersStore = useUsersStore();
usersStore.setOpenModalRegister(false)
const router = useRouter();
</script>
<template>
    <RegisterForm />
    <div class="d-flex justify-content-end">
        <p class="mr-3" style="padding-right: 15px;" @click="router.push('/admin');">Admin</p>
    </div>
    <div class="container rounded bg-white" style="width: 70%; min-height: 18em;">
        <div class="row p-3">
            <div class="d-flex justify-content-center pt-5">
                <button class="btn btn-primary" @click="usersStore.setOpenModalRegister(true)">Register</button>
            </div>
            <div class="d-flex justify-content-center pt-5">
                <button class="btn btn-primary" @click="router.push('/user-list');">View Users</button>
            </div>
        </div>
    </div>
</template>

