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
  <div class="d-flex justify-content-between mb-3">
    <div class="col-12 col-md-6 card" style="width: 49%;">
      <b>Available Seat: {{ usersStore.convocation.registerAvailable }}</b>
    </div>
    <div class="col-12 col-md-6 card" style="width: 49%;">
      <b>Registered: {{ usersStore.convocation.registered }}</b>
    </div>
  </div>
</template>

