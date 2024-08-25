<template>
  <home-page></home-page>
</template>

<script>

import HomePage from '../views/spectator/HomePage.vue'
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
