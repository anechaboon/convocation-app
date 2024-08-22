<template>
    <div class="container">
        <CountUser></CountUser>
        <div class="row mb-2">
            <div class="col-3">
                First Name
            </div>
            <div class="col-7">
                <input class="form-control" type="text" name="first_name" id="first_name">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-3">
                Last Name
            </div>
            <div class="col-7">
                <input class="form-control" type="text" name="last_name" id="last_name">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-3">
                Telephone
            </div>
            <div class="col-7">
                <input class="form-control" type="text" name="telephone" id="telephone">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-3"></div>
            <div class="col-7">
                <button class="btn btn-success form-control">Register</button>
            </div>
        </div>


    </div>
</template>
  
<script>
    import CountUser from './CountUser'
    export default {
        components : {
            CountUser
        },
        name: 'RegisterPage',
    }
</script>
 