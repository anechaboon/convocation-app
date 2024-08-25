<script setup>
    import { onMounted, ref } from 'vue';
    import EasyDataTable from 'vue3-easy-data-table';
    import 'vue3-easy-data-table/dist/style.css';
    import { useUsersStore } from "@/store/users";

    const usersStore = useUsersStore();
    const searchUser = ref("");
    const headers = ref([
        { text: "First Name", value: "firstName", sortable: true },
        { text: "Last Name", value: "lastName", sortable: true },
        { text: "Phone Number", value: "phoneNumber", sortable: true },
    ]);

    onMounted(async () => {
        usersStore.loadUsersList()
    });


</script>
<template>
  <div class="mb-2" style="text-align: left">
    <label>SearchBy:</label><input class="pl-5" v-model="searchUser" @keyup="usersStore.loadUsersList(searchUser)" />
  </div>
  <EasyDataTable
      :headers="headers"
      :items="usersStore.usersList"
  />
</template>
