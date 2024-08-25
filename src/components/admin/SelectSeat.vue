<script setup>
    import Api from "@/services/endpoint.js";
    // import moment from 'moment';
    import { onMounted, ref } from 'vue';
    import 'vue3-easy-data-table/dist/style.css';
    import { useUsersStore } from "@/store/users";
    import { getCurrentInstance } from 'vue';

    const users = useUsersStore();
    const { proxy } = getCurrentInstance(); // ใช้ getCurrentInstance เพื่อเข้าถึง globalProperties

    // ใช้ ref หรือ reactive แทน data
    // const date = ref(new Date());
    const allSeatrow = ref([]);
    const reservation = ref({
        seatNumber: "",
        reservedID: ""
    })
    // const currentDate = ref(moment(date.value).format('YYYY-MM-DD'))

    // ฟังก์ชันที่ทำงานเมื่อคอมโพเนนต์ถูกเมาท์
    onMounted(async () => {
        prepareSeatRow()
    });

    const fetchConvocation = async () => {
        // const queryString = `?date=${currentDate.value}`;
        
        try {
            const res = await Api.Convocation.getConvocation();
            if(res){
                users.setAvailable(res.data)
                return res.data
            }
        } catch (error) {
            console.error('Error fetching convocation:', error);
        }
        return []
    }

    const fetchReserved = async () => {
        // const queryString = `?date=${currentDate.value}`;
        try {
            let res = await Api.Reservation.getReserved();
            if(res){
                return res.data
            }
        } catch (error) {
            console.error('Error fetching reserved:', error);
        }
    }


    const prepareSeatRow = async (reservedData = {}) => {

        let convocation, reserved;
        if(Object.keys(reservedData).length){
            convocation = await fetchConvocation();
            reserved = reservedData;
        } else {
            [convocation, reserved] = await Promise.all([fetchConvocation(), fetchReserved()]);
        }
        
        const charEndRow = convocation.endRow;
        const allSeatrowData = [];

        const allSeatDiff = ((charEndRow.charCodeAt(0) - 65 + 1) * convocation.endColumn) - (convocation.allSeat);

        for (let i = 65; i <= charEndRow.charCodeAt(0); i++) {
            const char = String.fromCharCode(i);
            const seatrow = [];
            let endColumnNumber = convocation.endColumn;
            if (allSeatDiff && i == 65) {
                endColumnNumber -= allSeatDiff;
            }
            for (let j = 1; j <= endColumnNumber; j++) {
                let reservedID = null
                let seatNumber = `${char}${j}`
                let checkReserved = reserved.filter(row => row.seatNumber == seatNumber); 
                if(checkReserved.length){
                    reservedID = checkReserved[0].reservedID
                }
                seatrow.push({
                    seatNumber: `${char}${j}`,
                    reservedID: reservedID
                });
            }
            allSeatrowData.push(seatrow);
        }
        allSeatrow.value = allSeatrowData;
        console.log(`🚀 log:allSeatrowData`,allSeatrowData )

    }

    const reserve = (seat) => {
        if(seat.reservedID === null){
            reservation.value = {
                seatNumber: seat.seatNumber,
                reservedID: users.userID,
            }
        }
        console.log(`🚀 log:reserve.reservation`,reservation.value )

    };

    const confirmReserve = async () => {

        console.log(`🚀 log:reservation.value.reservedID`,reservation.value.reservedID )
        if (reservation.value.reservedID == null || reservation.value.reservedID == "") {
            console.log(`🚀 log:NotPass`, )
            proxy.$showAlert('Seat Number!', 'Please Select Seat', 'warning');
        } else {
            console.log(`🚀 log:Pass`, )
            let body = {
                seatNumber: reservation.value.seatNumber,
                reservedID: reservation.value.reservedID,
                // date: moment(date.value).format('YYYY-MM-DD'),
            }
            let res = await Api.Reservation.addReserved(body);
            console.log(`🚀 log:res`,res )
            console.log(`🚀 log:res.users`,res.data.users )
            prepareSeatRow(res.data.reserved)
            users.setUsersListData(res.data.users)
            users.setbookingID("")
            users.setSeatAvailable(res.data.convocation.seatAvailable)
            
        }
    }
</script>
<template>

    <div class="row">
        <div class="col-12 col-md-12">
            <!-- Date Picker Row -->
            <!-- <div class="row mb-3 justify-content-center">
                <div class="col-12 col-md-6">
                <VueDatePicker
                    v-model="date"
                    :format="'dd/MM/yyyy'"
                    :min-date="new Date()"
                ></VueDatePicker>
                </div>
            </div> -->
        
            <!-- Reserve Button Row -->
            <div class="row mb-3 justify-content-center">
                <div class="col-12 col-md-6">
                <button class="btn btn-primary form-control" @click="confirmReserve">Reserve</button>
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
                        :class="{ reserved: seat.seatNumber == reservation.seatNumber || seat.reservedID}"
                        :key="i"
                        @click="reserve(seat)"
                        >
                        <b>{{ seat.seatNumber }}</b>
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
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 12px;
    }
  }

  /* Media queries สำหรับหน้าจอขนาดใหญ่ (เดสก์ท็อป) */
  @media (min-width: 992px) {
    .seat {
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
    }
  }
</style>