<script setup>
    import Api from "@/services/endpoint.js";
    import { onMounted, ref } from 'vue';
    import EasyDataTable from 'vue3-easy-data-table';
    import 'vue3-easy-data-table/dist/style.css';
    import { useUsersStore } from "@/store/users";

    const users = useUsersStore();
    // ใช้ ref หรือ reactive แทน data
    const searchUser = ref("");
    const headers = ref([
        { text: "First Name", value: "firstName", sortable: true },
        { text: "Last Name", value: "lastName", sortable: true },
        { text: "Phone Number", value: "phoneNumber", sortable: true },
        { text: "Operation", value: "operation" },
    ]);
    // ฟังก์ชันที่ทำงานเมื่อคอมโพเนนต์ถูกเมาท์
    onMounted(async () => {
        users.setbookingID("")
        fetchUser()
    });

    // ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้
    const fetchUser = async () => {
        const queryString = `?q=${searchUser.value}`;
        try {
            const res = await Api.User.getUser(queryString);
            if (res) {
              users.setUsersListData(res.data)
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const booking = (user) => {
        console.log("Edit item:", user);
        users.setUserData(user)
        users.setbookingID(user._id)
        console.log(`🚀 log:users.userID`,users.userID )

    };

  

</script>
<template>
  <div class="mb-2" style="text-align: left">
      <label>SearchBy:</label><input class="pl-5" v-model="searchUser" @keyup="fetchUser()" />
  </div>
  <EasyDataTable
      v-model:items-selected="itemsSelected"
      :headers="headers"
      :items="users.usersList"
       @click-row="showRow"
  >
  
      <template #item-operation="item">
        <div class="operation-wrapper" v-if="typeof item.reservedSeat != 'undefined' && item.reservedSeat === false">
          <span
            class="operation-icon"
            :class="{ highlightbooking: item._id == users.bookingID}"
            @click="booking(item)"
          >
          Reserve
          </span>
        </div>
      </template>
  </EasyDataTable>
</template>

<style scoped>
.highlightbooking{
  background-color: aqua !important;

}

.operation-wrapper .operation-icon {
  width: 20px;
  cursor: pointer;
}
</style>