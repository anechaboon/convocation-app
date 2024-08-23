<script setup>
import UserListTable from '../../components/user/UserListTable.vue';
import CountUser from '../../components/user/CountUser.vue'
</script>
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-12">
                <CountUser />
                <UserListTable />
            </div>
        </div>
    </div>
</template>