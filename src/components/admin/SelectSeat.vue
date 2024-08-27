<script setup>
    import Api from "@/services/endpoint.js";
    import { onMounted, ref } from 'vue';
    import 'vue3-easy-data-table/dist/style.css';
    import { useSpectatorStore } from "@/store/spectator";
    import { getCurrentInstance } from 'vue';
    import Swal from 'sweetalert2';
// import moment from 'moment';

    // const date = ref(new Date());
    // const currentDate = ref(moment(date.value).format('YYYY-MM-DD'))

    const spectatorStore = useSpectatorStore();
    const { proxy } = getCurrentInstance();

    const allSeatrow = ref([]);
    const reservation = ref({
        seatNumber: "",
        reservedID: ""
    })

    let clicks = ref(0)
    const timer = ref(null) 

    onMounted(async () => {
        await Promise.all([spectatorStore.loadConvocation(), spectatorStore.loadReserved()]);
        prepareSeatRow()
    });

    const prepareSeatRow = async () => {
        let convocation = spectatorStore.convocation
        let reserved = spectatorStore.reservedsList
        const charEndRow = convocation.endRow;
        const allSeatrowData = [];

        const allSeatDiff = (charEndRow * convocation.endColumn) - (convocation.allSeat);
        // loop a to z
        for (let i = charEndRow-1; i >= 0 ; i--) {
            const charCode = 65+i
            const char = String.fromCharCode(charCode);
            const seatrow = [];
            let endColumnNumber = convocation.endColumn;

            // check allSeat equal (row * column) if not equal reduce seat of first row
            if (allSeatDiff && i == charEndRow-1) {
                endColumnNumber -= allSeatDiff;
            }

            for (let j = 1; j <= endColumnNumber; j++) {
                let reservedID = null
                let seatNumber = `${char}${j}`

                // check seat has reserved ?
                let checkReserved = reserved.filter(row => row.seatNumber == seatNumber); 
                if(checkReserved.length){
                    // reserved by id
                    reservedID = checkReserved[0].reservedID
                }
                seatrow.push({
                    seatNumber: seatNumber,
                    reservedID: reservedID
                });
            }
            allSeatrowData.push(seatrow);
        }

        // object to draw all seat map
        allSeatrow.value = allSeatrowData;

    }

    const reserve = async (event, seat) => {
        // check seat has reserved ?
        if(seat.reservedID === null){
            reservation.value = {
                seatNumber: seat.seatNumber,
                reservedID: spectatorStore.spectatorID,
            }
        }

        clicks.value += 1 
        if(clicks.value === 1) {
            timer.value = setTimeout(function () {
                clicks.value = 0
            }, 700);
        } else{
            clearTimeout(timer.value); 
            clicks.value = 0;

            await spectatorStore.loadConvocation()
            if(spectatorStore.convocation.seatAvailable > 0) {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Reserve!',
                    cancelButtonText: 'No, cancel!',
                    confirmButtonClass: 'btn btn-danger mt-2',
                    cancelButtonClass: 'btn btn-secondary ml-2 mt-2',
                }).then( function (result) {
                    if(result.value){
                        confirmReserve()
                    }
                });
            }else{
                proxy.$showAlert('Reserve Failed!', 'Fully Reserved', 'warning');
            }
        }  
        
    };

    const confirmReserve = async () => {

        if (reservation.value.reservedID == null || reservation.value.reservedID == "") {
            proxy.$showAlert('Seat Number!', 'Please Select Seat', 'warning');
        } else {
            let body = {
                seatNumber: reservation.value.seatNumber,
                reservedID: reservation.value.reservedID,
                // date: moment(date.value).format('YYYY-MM-DD'),
            }
            let res = await Api.Reservation.addReserved(body);

            if(res.status == 201){
                await spectatorStore.setReservedsList(res.data.reserved)
                prepareSeatRow()
                spectatorStore.setSpectatorListData(res.data.spectators)
                spectatorStore.setbookingID("")
                spectatorStore.setConvocation(res.data.convocation)

            }else{
                proxy.$showAlert('Reserve Failed!', res.data.message, 'warning');
            }
        }
    }
</script>
<template>

    <div class="card me-3">
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
                        @click="reserve($event, seat)"
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