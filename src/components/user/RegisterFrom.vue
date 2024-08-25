<script setup>
import Api from "@/services/endpoint.js";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUsersStore } from "@/store/users";
import { getCurrentInstance } from 'vue';
// import moment from 'moment';

// const date = ref(new Date());

const usersStore = useUsersStore();
const { proxy } = getCurrentInstance();

const firstName = ref("");
const lastName = ref("");
const phoneNumber = ref("");
const isValidPhone = ref(true);

const router = useRouter();

const validatePhoneNumber = () => {
    const phoneRegex = /^[0-9]{10}$/;
    isValidPhone.value = phoneRegex.test(phoneNumber.value);
}

const register = async () => {
    if(!isValidPhone.value || phoneNumber.value == ""){
       
        proxy.$showAlert('Invalid phone number!', 'Please Input Phone Number', 'warning');

    } else if (firstName.value == "" || lastName.value == "") {
        proxy.$showAlert('Invalid name!', 'Please Input First Name / Last Name', 'warning');

    } else {
        // const formattedDate = moment(date.value).format('YYYY-MM-DD');
        const body = {
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            // date: formattedDate
        };
        
        try {
            const res = await Api.User.register(body);
            if (res.status === 201) {
                usersStore.setUserData(res.data)
                router.push('/user-list');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    
};
</script>


<template>
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
            <input class="form-control" type="text" name="phoneNumber" id="phoneNumber" v-model="phoneNumber" @input="validatePhoneNumber" >
            <span v-if="!isValidPhone" style="color: red">Invalid phone number</span>
        </div>
    </div>

    <!-- <div class="row mb-2">
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
    </div> -->
    <div class="row mb-2">
        <div class="col-3"></div>
        <div class="col-7">
            <button class="btn btn-success form-control" @click="register()">Register</button>
        </div>
    </div>
</template>
  
