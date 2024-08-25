<script setup>
import { onMounted } from 'vue';
// import moment from 'moment';
import { useUsersStore } from "@/store/users";

const usersStore = useUsersStore();


onMounted(() => {
  usersStore.loadConvocation();
});
</script>

<template>
  <div>
    <p>Available Seat: {{ usersStore.registerAvailable }}</p>
    <p>Registered: {{ usersStore.registered }}</p>
  </div>
</template>
