<script setup>
import { onMounted } from 'vue'; // นำเข้าจาก Vue
import Api from "@/services/endpoint.js";
// import moment from 'moment';
import { useUsersStore } from "@/store/users";

const usersStore = useUsersStore();

const fetchConvocation = async () => {
  // let date = moment().format('YYYY-MM-DD'); // ใช้ moment() แทน this.date
  // let queryString = `?date=${date}`;
  let res = await Api.Convocation.getConvocation();
  console.log('Fetched seat data:', res.data.seatAvailable); // ตรวจสอบค่าที่ดึงมา

  usersStore.setSeatAvailable(res.data.seatAvailable); 
  usersStore.setRegistered(res.data.registered); 

  
  console.log('Available seat after update:', usersStore.seatAvailable); // ตรวจสอบค่าหลังการอัพเดต
};

// เรียกใช้ fetchSeat เมื่อคอมโพเนนต์ถูกเมาท์
onMounted(() => {
  fetchConvocation();
});
</script>

<template>
  <div>
    <p>Seat Available: {{ usersStore.seatAvailable }}</p>
    <p>Register Available: {{ usersStore.registerAvailable }}</p>
    <p>Registered: {{ usersStore.registered }}</p>
  </div>
</template>
