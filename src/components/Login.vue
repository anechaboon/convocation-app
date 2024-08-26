<script setup>
import Api from "@/services/endpoint.js";
import { ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import HomeButton from './HomeButton.vue'
const { proxy } = getCurrentInstance();
const router = useRouter();

const email = ref("")
const password = ref("")

const login = async () => {
    let body = {
        email: email.value,
        password: password.value
    }
    const res = await Api.User.login(body)
    if(res){
        switch (res.status) {
            case 200:
                router.push('/admin');
                break;
        
            case 401:
                proxy.$showAlert('Login Faild!', res.data.message, 'warning');
                break;
        }
    }else{
        proxy.$showAlert('Login Faild!', 'Internal Server Error', 'warning');
    }
}

</script>

<template>
    <HomeButton></HomeButton>
    <div class="container card min-height-md" style="width: 35%">
        <div class="row mb-2 mt-3">
            <div class="col-2"></div>
            <div class="col-8">
                <p class="float-start mb-1">Email</p>
                <input class="form-control" type="text" name="email" id="email" v-model="email">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-2"></div>
            <div class="col-8">
                <p class="float-start mb-1">Password</p>
                <input class="form-control" type="password" name="password" id="password" v-model="password">
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-2"></div>
            <div class="col-8">
                <button class="btn btn-primary form-control mt-2" @click="login">Login</button>
            </div>
        </div>
        
    </div>
</template>
  
<script>
    export default {
        name: 'LoginPage',
    }
</script>
 