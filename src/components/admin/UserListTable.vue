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
        { text: "", value: "" },

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

<style scoped>

  /* จัดเรียงที่นั่งให้เป็นกล่อง ๆ */
  .seat-row {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .seat {
    background-color: bisque;
    border-radius: 5px;
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 5px;
    border: 1px solid #dee2e6;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  /* จัดการที่นั่งที่ถูกจองแล้ว */
  .seat.reserved {
    background-color: rgb(191 214 228);
  }

  /* สไตล์ปุ่มเพื่อให้ดูเรียบง่ายและเข้ากับหน้าจอขนาดเล็ก */
  button {
    width: 100%;
  }

  /* Media queries สำหรับหน้าจอขนาดเล็ก (มือถือ) */
  @media (max-width: 576px) {
    .seat {
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 10px;
    }
  }

  /* Media queries สำหรับหน้าจอขนาดกลาง (แท็บเล็ต) */
  @media (min-width: 768px) {
    .seat {
      width: 60px;
      height: 60px;
      line-height: 60px;
      font-size: 12px;
    }
  }

  /* Media queries สำหรับหน้าจอขนาดใหญ่ (เดสก์ท็อป) */
  @media (min-width: 992px) {
    .seat {
      width: 70px;
      height: 70px;
      line-height: 70px;
      font-size: 14px;
    }
  }
</style>