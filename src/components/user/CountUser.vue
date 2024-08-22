
<template>
  <div>
    <p>Available Seat: {{ counter.availableSeat }}</p>
    <p>Registered: {{ counter.registered }}</p>
  </div>
</template>

<script setup>
import { useCounterStore } from '../../store/user';

const counter = useCounterStore();
</script>