<script setup>
import Api from "@/services/endpoint.js";
import { useRouter } from 'vue-router';
import { ref, getCurrentInstance } from 'vue';
import { useSpectatorStore } from "@/store/spectator";

const spectatorStore = useSpectatorStore();
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
            const res = await Api.Spectator.register(body);
            if (res.status === 201) {
                spectatorStore.setSpectatorData(res.data)
                router.push('/spectator-list');
            }else{
                proxy.$showAlert('Register Failed!', res.data.message, 'warning');
            }

        } catch (error) {
            console.error('Error during registration:', error);
        }
    }
};
</script>

<template>
    <div v-if="spectatorStore.openModalRegister" class="modal-overlay fade show">
        <div class="modal-content">
            <div class="row mb-3">
                <div class="col-2"></div>
                <div class="col-8">
                    <h5><b>Registration</b></h5>
                </div>

                <div class="col-2" @click="spectatorStore.setOpenModalRegister(false)">
                <p><b>x</b></p>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-2"></div>
                <div class="col-8">
                    <p class="float-start mb-1">First Name</p>
                    <input class="form-control" type="text" name="first_name" id="first_name" v-model="firstName">
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-2"></div>
                <div class="col-8">
                    <p class="float-start mb-1">Last Name</p>
                    <input class="form-control" type="text" name="last_name" id="last_name" v-model="lastName">
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-2"></div>
                <div class="col-8">
                    <p class="float-start mb-1">Telephone</p>
                    <input class="form-control" type="text" name="phoneNumber" id="phoneNumber" v-model="phoneNumber" @input="validatePhoneNumber" >
                    <span class="float-start" v-if="!isValidPhone" style="color: red">Invalid phone number</span>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-2"></div>
                <div class="col-8">
                    <button class="btn btn-primary form-control mt-2" @click="register()">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        width: 35%;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
    }
</style>
  
