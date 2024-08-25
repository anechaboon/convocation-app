<script setup>
import Api from "@/services/endpoint.js";
import { ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

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
                console.log(`🚀 log:res`,res )
                proxy.$showAlert('Login Faild!', res.data.message, 'warning');
                break;
        }
    }else{
        proxy.$showAlert('Login Faild!', 'Internal Server Error', 'warning');
    }
}

</script>

<template>
    <div class="container card min-height-md">
        <div class="row mb-2">
            <div class="col-3">
                Email
            </div>
            <div class="col-7">
                <input class="form-control" type="text" name="email" id="email" v-model="email">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-3">
                Password
            </div>
            <div class="col-7">
                <input class="form-control" type="password" name="password" id="password" v-model="password">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-3"></div>
            <div class="col-7">
                <button class="btn btn-primary form-control" @click="login">Login</button>
            </div>
        </div>
    </div>
</template>
  
<script>
    export default {
        name: 'LoginPage',
    }
</script>
 