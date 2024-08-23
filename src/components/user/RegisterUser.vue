<script setup>
import Api from "@/services/endpoint.js";
import CountUser from './CountUser';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import moment from 'moment';
import { useUsersStore } from "@/store/users";
const usersStore = useUsersStore();

// ใช้ Composition API ในการประกาศตัวแปร
const firstName = ref("");
const lastName = ref("");
const phoneNumber = ref("");
const date = ref(new Date());

// ใช้ Vue Router
const router = useRouter();

// ฟังก์ชันการลงทะเบียน
const register = async () => {
    const formattedDate = moment(date.value).format('YYYY-MM-DD');
    const body = {
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        date: formattedDate
    };
    
    try {
        const res = await Api.User.register(body);
        if (res.status === 201) {
            console.log(`🚀 log:res.data`,res.data )
            usersStore.setUserData(res.data)
            router.push('/select-seat');
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
};
</script>


<template>
    <div class="container">
        <CountUser></CountUser>
        <div class="row mb-2">
            <div class="col-3">
                First Name
            </div>
            <div class="col-7">
                <input class="form-control" type="text" name="first_name" id="first_name" v-model="firstName">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-3">
                Last Name
            </div>
            <div class="col-7">
                <input class="form-control" type="text" name="last_name" id="last_name" v-model="lastName">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-3">
                Telephone
            </div>
            <div class="col-7">
                <input class="form-control" type="text" name="phoneNumber" id="phoneNumber" v-model="phoneNumber">
            </div>
        </div>

        <div class="row mb-2">
            <div class="col-3">
                Date
            </div>
            <div class="col-7">
                <VueDatePicker
                    v-model="date"
                    :format="'dd/MM/yyyy'"
                    :min-date="new Date()"
                ></VueDatePicker>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-3"></div>
            <div class="col-7">
                <button class="btn btn-success form-control" @click="register()">Register</button>
            </div>
        </div>


    </div>
</template>
  
