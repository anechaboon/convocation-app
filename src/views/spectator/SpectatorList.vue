<script setup>
import SpectatorListTable from '../../components/spectator/SpectatorListTable.vue';
import CountSpectator from '../../components/spectator/CountSpectator.vue'
import HomeButton from '../../components/HomeButton.vue'
</script>
<template>
  
    <div class="container">
        <div class="row">
            <div class="row col-1">
                <HomeButton></HomeButton>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-12">
                <CountSpectator />
                <SpectatorListTable />
            </div>
        </div>
    </div>
</template>