<script setup>
import SpectatorListTable from '../../components/spectator/SpectatorListTable.vue';
import CountSpectator from '../../components/spectator/CountSpectator.vue'
</script>
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-12">
                <CountSpectator />
                <SpectatorListTable />
            </div>
        </div>
    </div>
</template>