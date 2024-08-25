<script setup>
    import Api from "@/services/endpoint.js";
    import { onMounted, ref } from 'vue';
    import EasyDataTable from 'vue3-easy-data-table';
    import 'vue3-easy-data-table/dist/style.css';

    // ใช้ ref หรือ reactive แทน data
    const searchUser = ref("");
    const headers = ref([
        { text: "First Name", value: "firstName", sortable: true },
        { text: "Last Name", value: "lastName", sortable: true },
        { text: "Phone Number", value: "phoneNumber", sortable: true },
    ]);
    const items = ref([]);

    // ฟังก์ชันที่ทำงานเมื่อคอมโพเนนต์ถูกเมาท์
    onMounted(async () => {
        fetchUser()
    });

    // ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้
    const fetchUser = async () => {
        const queryString = `?q=${searchUser.value}`;
        try {
            const res = await Api.User.getUser(queryString);
            if (res) {
                items.value = res.data;
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

</script>
<template>
  <div class="mb-2" style="text-align: left">
      <label>SearchBy:</label><input class="pl-5" v-model="searchUser" @keyup="fetchUser()" />
  </div>
  <EasyDataTable
      :headers="headers"
      :items="items"
  />
</template>
