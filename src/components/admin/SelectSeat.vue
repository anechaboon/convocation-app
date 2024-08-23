<script setup>
    import Api from "@/services/endpoint.js";
    import moment from 'moment';
    import { onMounted, ref } from 'vue';
    import 'vue3-easy-data-table/dist/style.css';
    import { useUsersStore } from "@/store/users";
    const usersStore = useUsersStore();

    // ใช้ ref หรือ reactive แทน data
    const date = ref(new Date());
    const allSeatrow = ref([]);
    const searchUser = ref("");
    const newReserve = ref({});
    const items = ref([]);

    // ฟังก์ชันที่ทำงานเมื่อคอมโพเนนต์ถูกเมาท์
    onMounted(async () => {
        fetchConvocation()
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

    const fetchConvocation = async () => {
        const formattedDate = moment(date.value).format('YYYY-MM-DD');
        const queryString = `?date=${formattedDate}`;
        
        try {
            const res = await Api.Convocation.getConvocation(queryString);
            console.log(`🚀 log:res`, res);
            
            // const reserved = res.data.reserved.split(',')
            const charEndRow = res.data.endRow;
            const allSeatrowData = [];

            const allSeatDiff = ((charEndRow.charCodeAt(0) - 65 + 1) * res.data.endColumn) - (res.data.allSeat);

            for (let i = 65; i <= charEndRow.charCodeAt(0); i++) {
                const char = String.fromCharCode(i);
                const seatrow = [];
                let endColumnNumber = res.data.endColumn;
                if (allSeatDiff && i == 65) {
                    endColumnNumber -= allSeatDiff;
                }
                for (let j = 1; j <= endColumnNumber; j++) {
                    seatrow.push({
                        seatName: `${char}${j}`,
                        reservedID: null
                    });
                }
                allSeatrowData.push(seatrow);
            }
            allSeatrow.value = allSeatrowData;
            console.log(`🚀 log:allSeatrowData`,allSeatrowData )

            await fetchUser();
        } catch (error) {
            console.error('Error fetching seats:', error);
        }
    }

    // ฟังก์ชันสำหรับการจองที่นั่ง
    const reserve = (seatName, idx) => {
        newReserve.value = {
            seatName: seatName,
            reservedID: usersStore.id
        }
        const index = allSeatrow.value[idx].findIndex(element => element.seatName === seatName);
        if (allSeatrow.value[idx][index].reservedID === null) {
            allSeatrow.value[idx][index].reservedID = usersStore.id
        }
    };
</script>
<template>
    <div class="row">
        <CountUser></CountUser>
    </div>
    <div class="row">
        <div class="col-12 col-md-12">
            <!-- Date Picker Row -->
            <div class="row mb-3 justify-content-center">
                <div class="col-12 col-md-6">
                <VueDatePicker
                    v-model="date"
                    :format="'dd/MM/yyyy'"
                    :min-date="new Date()"
                ></VueDatePicker>
                </div>
            </div>
        
            <!-- Reserve Button Row -->
            <div class="row mb-3 justify-content-center">
                <div class="col-12 col-md-6">
                <button class="btn btn-primary form-control">Reserve</button>
                </div>
            </div>
        
            <!-- Seat Row -->
            <div class="row mb-3 justify-content-center">
                <div class="col-12 col-md-12 text-center">
                <div v-if="allSeatrow">
                    <div v-for="(seatrow, idx) in allSeatrow" :key="idx">
                    <div class="seat-row">
                        <span
                        v-for="(seat, i) in seatrow"
                        class="seat"
                        :class="{ reserved: seat.reservedID }"
                        :key="i"
                        @click="reserve(seat.seatName, idx)"
                        >
                        {{ seat.seatName }}
                        </span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
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