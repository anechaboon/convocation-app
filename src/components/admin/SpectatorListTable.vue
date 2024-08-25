<script setup>
    import { onMounted, ref } from 'vue';
    import EasyDataTable from 'vue3-easy-data-table';
    import 'vue3-easy-data-table/dist/style.css';
    import { useSpectatorStore } from "@/store/spectator";

    const spectatorStore = useSpectatorStore();
    const searchSpectator = ref("");
    const headers = ref([
        { text: "First Name", value: "firstName", sortable: true },
        { text: "Last Name", value: "lastName", sortable: true },
        { text: "Phone Number", value: "phoneNumber", sortable: true },
        { text: "Operation", value: "operation" },
    ]);

    onMounted(async () => {
        spectatorStore.setbookingID("")
        spectatorStore.loadSpectatorList()
    });

    const reserveSeat = (spectator) => {
        spectatorStore.setSpectatorData(spectator)
        spectatorStore.setbookingID(spectator._id)
    };

</script>
<template>
  <div class="card">
    <div class="mb-1 d-flex" style="text-align: left">
      <div class="col-10 col-md-4">
        <input class="pl-5 form-control" v-model="searchSpectator" placeholder="Search" @keyup="spectatorStore.loadSpectatorList(searchSpectator)" style="height: 1.8em;" />
      </div>
    </div>
    <EasyDataTable
        v-model:items-selected="itemsSelected"
        :headers="headers"
        :items="spectatorStore.spectatorList"
        @click-row="showRow"
        table-class-name="customize-table"
    >
    
        <template #item-operation="item">
          <div class="operation-wrapper" v-if="typeof item.reservedSeat != 'undefined' && item.reservedSeat === false">
            <span
              class="operation-icon"
              :class="{ highlightbooking: item._id == spectatorStore.bookingID}"
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
  color: #4ea0e7 !important;
  font-weight: 1000;

}

.operation-wrapper .operation-icon {
  width: 20px;
  cursor: pointer;
}
</style>