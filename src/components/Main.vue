<template>
  <register-user></register-user>
</template>

<script>

import RegisterUser from '../views/user/RegisterUser.vue'
export default {
  name: 'MainPage',
  components: {
    RegisterUser
  },
  props: {
    msg: String
  }
}
</script>
