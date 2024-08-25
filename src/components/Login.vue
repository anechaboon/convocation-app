<template>
    <div class="container">
        <div class="row mb-2">
            <div class="col-3">
                Email
            </div>
            <div class="col-7">
                <input class="form-control" type="text" name="email" id="email">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-3">
                Password
            </div>
            <div class="col-7">
                <input class="form-control" type="password" name="password" id="password">
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-3"></div>
            <div class="col-7">
                <button class="btn btn-primary form-control">Login</button>
            </div>
        </div>


    </div>
</template>
  
<script>
    export default {
        name: 'LoginPage',
    }
</script>
 