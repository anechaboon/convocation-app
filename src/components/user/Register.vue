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
            <div class="col-3"></div>
            <div class="col-7">
                <button class="btn btn-success form-control" @click="register()">Register</button>
            </div>
        </div>


    </div>
</template>
  
<script>
    import Api from "@/services/endpoint.js"
    import CountUser from './CountUser'
    export default {
        components : {
            CountUser
        },
        name: 'RegisterPage',
        data() {
            return {
                firstName: "",
                lastName: "",
                phoneNumber: "",
            }
        },
        methods: {
            async register(){
                const body = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phoneNumber: this.phoneNumber,
                }
                const res = await Api.User.register(body)
                console.log(`🚀 log:res`,res )
                if(res.status === 201){
                    window.open('/select-seat',"_self");
                }
            }
        }
    }
</script>
