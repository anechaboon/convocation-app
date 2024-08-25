<script setup>
import { onMounted } from 'vue';
// import moment from 'moment';
import { useSpectatorStore } from "@/store/spectator";

const spectatorStore = useSpectatorStore();


onMounted(() => {
  spectatorStore.loadConvocation();
});
</script>

<template>
  <div class="d-flex justify-content-between mb-3">
    <div class="col-12 col-md-6 card" style="width: 49%;">
      <b>Available Seat: {{ spectatorStore.convocation.registerAvailable }}</b>
    </div>
    <div class="col-12 col-md-6 card" style="width: 49%;">
      <b>Registered: {{ spectatorStore.convocation.registered }}</b>
    </div>
  </div>
</template>

