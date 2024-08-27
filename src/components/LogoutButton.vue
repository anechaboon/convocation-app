
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const Logout = () => {
    localStorage.removeItem('user-token');
    router.push('/');
}
</script>
<template>
    <div class="row container start">
        <p class=" mb-1 ps-0"><b class="cursor float-start" @click="Logout()">Logout</b></p>
    </div>
</template>