<script setup>
import { onMounted } from 'vue'; // นำเข้าจาก Vue
// import moment from 'moment';
import { useSpectatorStore } from "@/store/spectator";

const spectatorStore = useSpectatorStore();

// เรียกใช้ fetchSeat เมื่อคอมโพเนนต์ถูกเมาท์
onMounted(() => {
  spectatorStore.loadConvocation();
});
</script>

<template>
  <div class="d-flex justify-content-between mb-4">

    <div class="d-flex col-12 col-md-6 card-2" style="width: 32.5%;">
      <div class="col-10">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-1 icon-dashboard icon-sm">
            <font-awesome-icon icon="chair" class="icon-size-md w-fit"/>
          </div>
        </div>
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10 col-md-5 ps-0">
            <b class="w-fit font-size-sm float-start">Seat Available</b>
          </div>
        </div>
      </div>
      <div class="col-2">
          <b><h3 class="float-end mt-3 count-inspectator">{{ spectatorStore.convocation.seatAvailable }}</h3></b>
      </div>
    </div>

    <div class="d-flex col-12 col-md-6 card-2" style="width: 32.5%;">
      <div class="col-10">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-1 icon-dashboard icon-sm">
            <font-awesome-icon icon="users" class="icon-size-md w-fit"/>
          </div>
        </div>
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10 col-md-5 ps-0">
            <b class="w-fit font-size-sm float-start">Register Available</b>
          </div>
        </div>
      </div>
      <div class="col-2">
          <b><h3 class="float-end mt-3 count-inspectator">{{ spectatorStore.convocation.registerAvailable }}</h3></b>
      </div>
    </div>

    <div class="d-flex col-12 col-md-6 card-2" style="width: 32.5%;">
      <div class="col-10">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-1 icon-dashboard icon-sm">
            <font-awesome-icon icon="id-card" class="icon-size-md w-fit"/>
          </div>
        </div>
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10 col-md-5 ps-0">
            <b class="w-fit font-size-sm float-start">Registered</b>
          </div>
        </div>
      </div>
      <div class="col-2">
          <b><h3 class="float-end mt-3 count-inspectator">{{ spectatorStore.convocation.registered }}</h3></b>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .icon-size-md {
    font-size: 19px;
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

 

   /* Media queries สำหรับหน้าจอขนาดเล็ก (มือถือ) */
   @media (max-width: 576px) {
    .seat {
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 10px;
    }
    .icon-sm {
      height: 3rem !important;
      width: 3rem !important;
      border-radius: 50%;
    }
  
    .font-size-sm{
      font-size: 14px;
    }
  }

  /* Media queries สำหรับหน้าจอขนาดกลาง (แท็บเล็ต) */
  @media (min-width: 768px) {
    .seat {
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 12px;
    }
    .icon-sm {
      height: 3rem !important;
      width: 3rem !important;
      border-radius: 50%;
    }
    .count-inspectator{
      margin-right: 1.5rem !important;
    }
    .font-size-sm{
      font-size: 14px;
    }
  }

  /* Media queries สำหรับหน้าจอขนาดใหญ่ (เดสก์ท็อป) */
  @media (min-width: 992px) {
    .seat {
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
    }
    .icon-sm {
      height: 3rem !important;
      width: 3rem !important;
      border-radius: 50%;
    }
    .count-inspectator{
      margin-right: 1.5rem !important;
    }
    .font-size-sm{
      font-size: 14px;
    }
  }
</style>
