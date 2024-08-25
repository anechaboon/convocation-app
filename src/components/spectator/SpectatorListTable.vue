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
    ]);

    onMounted(async () => {
        spectatorStore.loadSpectatorList()
    });


</script>
<template>
  <div class="card">
    <div class="mb-1 d-flex" style="text-align: left">
      <div class="col-2 w-fit me-2 pt-1">
        <label>Search:</label>
      </div>
      <div class="col-10 col-md-4 col-lg-2">
        <input class="pl-5 form-control" v-model="searchSpectator" @keyup="spectatorStore.loadSpectatorList(searchSpectator)" style="height: 1.8em;" />
      </div>
    </div>
    <EasyDataTable
        :headers="headers"
        :items="spectatorStore.spectatorList"
    />
  </div>
</template>
