<script setup>
import SelectSeat from '../../components/admin/SelectSeat.vue';
import CountUser from '../../components/admin/CountUser.vue';
import UserListTable from '../../components/admin/UserListTable.vue';
</script>
<template>
    <div class="container">
        <CountUser />
        <div class="row">
            <div class="col-12 col-md-6">
                <SelectSeat />
            </div>
            <div class="col-12 col-md-6">
                <UserListTable ref="userTable"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container{
        max-width: 95% !important;
    }
</style>