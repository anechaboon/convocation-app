<template>
  <register-user></register-user>
</template>

<script>

import RegisterUser from './user/RegisterUser'
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
