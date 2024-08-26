
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
    <div class="row container start">
        <p class=" mb-1"><b class="cursor justify-content-start" @click="router.push('/');">Home</b></p>
    </div>
</template>