<template>
  <div id="app">
    <router-view></router-view>
  </div>
  <div id="modal"></div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
.min-height-md{
  min-height: 18em;
}
.bg-white{
  background-color: white;
}
.w-fit {
  width: fit-content;
}
body {
  background-image: url('/src/assets/bg-img.jpg'); /* ใส่ path ของรูปภาพ */
  background-size: cover; /* ขยายภาพให้เต็มหน้า */
}
.card {
  border-radius: var(--bs-border-radius) !important;
  background-color: white;
  padding: 1.5rem !important;
}
.btn-primary{
  --bs-btn-color: #fff;
  --bs-btn-bg: #84b4d8;
  --bs-btn-border-color: #84b4d8;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #47a6ef;
  --bs-btn-hover-border-color: #84b4d8;
}

</style>
