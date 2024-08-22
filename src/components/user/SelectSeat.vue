<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6">
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
                            class="seat"
                            :class="{ reserved: seat.reserved }"
                            v-for="(seat, i) in seatrow"
                            :key="i"
                            @click="reserve(seat.name, idx)"
                            >
                            {{ seat.name }}
                            </span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div style="text-align: left">
                    <label>SearchBy:</label><input v-model="searchUser" @keyup="fetchUser()" />
                </div>
                    <EasyDataTable
                       :headers="headers"
                        :items="items"
                    />
            </div>
        </div>
       
      
    </div>
</template>
<script>
    import Api from "@/services/endpoint.js"
    import moment from 'moment'

    import EasyDataTable from 'vue3-easy-data-table';
    import 'vue3-easy-data-table/dist/style.css';

    export default {
        name: 'SelectSeat',
        components: {
            EasyDataTable
        },
        props: {},
        data() {
            return {
                date: new Date(),
                allSeatrow: [],
                searchUser: "",
                headers:[
                    { text: "First Name", value: "firstName", sortable: true },
                    { text: "Last Name", value: "lastName", sortable: true },
                    { text: "Phone Number", value: "phoneNumber", sortable: true },
                ],
                items: [],
            }
        },
        async mounted() {
            let date = moment(this.date).format('YYYY-MM-DD')
            let queryString = `?date=${date}`
            let res = await Api.Seat.getSeat(queryString)
            console.log(`🚀 log:res`,res )
            let charEndRow = res.data.endRow
            let allSeatrow = []

            // res.data.seatAvailable
            let allSeatDiff = ((charEndRow.charCodeAt(0) - 65 + 1) * res.data.endColumn) - res.data.seatAvailable;

            // for (let i = charEndRow.charCodeAt(0); i >= 65 ; i--) {
            for (let i = 65; i <= charEndRow.charCodeAt(0); i++) {
                let char = String.fromCharCode(i)
                let seatrow = []
                let endColumnNumber = res.data.endColumn
                if(allSeatDiff && i == 65){
                    endColumnNumber -= allSeatDiff 
                }
                for (let j = 1; j <= endColumnNumber; j++) {
                    seatrow.push({
                        name: `${char}${j}`,
                        reserved: 0
                    })
                }
                allSeatrow.push(seatrow)
            }
            this.allSeatrow = allSeatrow

            this.fetchUser()
        },
        methods: {
            async fetchUser(){
                let queryString = `?q=${this.searchUser}`
                let res = await Api.User.getUser(queryString)
                if(res){
                    this.items = res.data
                }
            },
            reserve(seatName, idx){
                let index = this.allSeatrow[idx].findIndex(elment => elment.name === seatName);
                this.allSeatrow[idx][index].reserved = this.allSeatrow[idx][index].reserved ? 0 : 1
            },
        }
    }
</script>
<style scoped>

  /* ปรับแต่งสไตล์ที่ใช้ในหน้า booking seat */
  .container {
    max-width: 100%;
  }

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