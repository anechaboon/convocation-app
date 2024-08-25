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
    ]);

    onMounted(async () => {
        spectatorStore.loadSpectatorList("",true)
    });

</script>
<template>
  <div class="card">
    <div class="mb-2 d-flex" style="text-align: left">
      <div class="col-10 col-md-4 col-lg-2">
        <input class="pl-5 form-control" v-model="searchSpectator"  placeholder="Search" @keyup="spectatorStore.loadSpectatorList(searchSpectator,true)" style="height: 1.8em;" />
      </div>
    </div>
    <EasyDataTable
        :headers="headers"
        :items="spectatorStore.spectatorList"
        table-class-name="customize-table"
    />
  </div>
</template>
