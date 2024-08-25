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
  <div class="d-flex justify-content-between mb-4">
    <div class="col-12 col-md-6 card" style="width: 32.5%;">
      <div class="d-flex justify-content-center">
        <div class="col-2 icon-dashboard icon-sm">
          <font-awesome-icon icon="chair" class="icon-size-3 w-fit"/>
        </div>
        <div class="col-10 pt-2">
          <b class="w-fit">Seat Available: {{ usersStore.convocation.seatAvailable }}</b>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 card" style="width: 32.5%;">
      <div class="d-flex justify-content-center">
        <div class="col-2 icon-dashboard icon-sm">
          <font-awesome-icon icon="users" class="icon-size-3 w-fit"/>
        </div>
        <div class="col-10 pt-2">
          <b class="w-fit">Register Available: {{ usersStore.convocation.registerAvailable }}</b>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 card" style="width: 32.5%;">
      <div class="d-flex justify-content-center">
        <div class="col-2 icon-dashboard icon-sm">
          <font-awesome-icon icon="id-card" class="icon-size-3 w-fit"/>
        </div>
        <div class="col-10 pt-2">
          <b class="w-fit">Registered: {{ usersStore.convocation.registered }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .icon-size-3 {
    font-size: 19px;
  }
  .icon-sm {
    height: 3rem !important;
    width: 3rem !important;
    border-radius: 50%;
  }
  .icon-dashboard{
    align-items: center;
    background-color: #69a9db;
    color: #fff;
    display: flex;
    font-weight: 500;
    height: 100%;
    justify-content: center;
    width: 100%;
  }

  .icon-dashboard::before{
    content: "";
    position: absolute;
    width: 8px;
    height: 54px;
    background-color: rgba(255, 255, 255, 0.1);
    left: 49px;
    transform: rotate(32deg);
    top: 19px;
    transition: all 0.4s;
  }

  .icon-dashboard::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 54px;
    background-color: rgba(255, 255, 255, 0.1);
    left: 28px;
    transform: rotate(32deg);
    top: 19px;
    transition: all 0.4s;
  }
</style>
