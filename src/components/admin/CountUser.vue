<script setup>
import { onMounted } from 'vue'; // นำเข้าจาก Vue
// import moment from 'moment';
import { useUsersStore } from "@/store/users";

const usersStore = useUsersStore();

// เรียกใช้ fetchSeat เมื่อคอมโพเนนต์ถูกเมาท์
onMounted(() => {
  usersStore.loadConvocation();
});
</script>

<template>
  <div>
    <p>Seat Available: {{ usersStore.convocation.seatAvailable }}</p>
    <p>Register Available: {{ usersStore.convocation.registerAvailable }}</p>
    <p>Registered: {{ usersStore.convocation.registered }}</p>
  </div>
</template>
