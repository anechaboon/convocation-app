<template>
  <home-page></home-page>
</template>

<script>

import HomePage from '../views/user/HomePage.vue'
export default {
  name: 'MainPage',
  components: {
    HomePage
  },
  props: {
    msg: String
  }
}
</script>
