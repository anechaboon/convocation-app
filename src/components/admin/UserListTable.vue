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
        { text: "Operation", value: "operation" },
    ]);

    onMounted(async () => {
        usersStore.setbookingID("")
        usersStore.loadUsersList()
    });

    const reserveSeat = (user) => {
        usersStore.setUserData(user)
        usersStore.setbookingID(user._id)
    };

  

</script>
<template>
  <div class="card">
    <div class="mb-1 d-flex" style="text-align: left">
      <div class="col-2 w-fit me-2 pt-1">
        <label>Search:</label>
      </div>
      <div class="col-10 col-md-4">
        <input class="pl-5 form-control" v-model="searchUser" @keyup="usersStore.loadUsersList(searchUser)" style="height: 1.8em;" />
      </div>
    </div>
    <EasyDataTable
        v-model:items-selected="itemsSelected"
        :headers="headers"
        :items="usersStore.usersList"
        @click-row="showRow"
    >
    
        <template #item-operation="item">
          <div class="operation-wrapper" v-if="typeof item.reservedSeat != 'undefined' && item.reservedSeat === false">
            <span
              class="operation-icon"
              :class="{ highlightbooking: item._id == usersStore.bookingID}"
              @click="reserveSeat(item)"
            >
            Reserve
            </span>
          </div>
        </template>
    </EasyDataTable>
  </div>
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