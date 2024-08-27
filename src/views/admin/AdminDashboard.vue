<script setup>
import SelectSeat from '../../components/admin/SelectSeat.vue';
import CountSpectator from '../../components/admin/CountSpectator.vue';
import SpectatorListTable from '../../components/admin/SpectatorListTable.vue';
import LogoutButton from '../../components/LogoutButton.vue'
</script>
<template>
    <div class="container">
        <div class="row">
            <div class=" col-1">
                <LogoutButton></LogoutButton>
            </div>
        </div>
        <CountSpectator />
        <div class="row">
            <div class="col-12 col-md-6">
                <SelectSeat />
            </div>
            <div class="col-12 col-md-6">
                <SpectatorListTable />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container{
        max-width: 95% !important;
    }
</style>