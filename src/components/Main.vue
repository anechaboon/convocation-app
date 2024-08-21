<template>
  <register></register>
</template>

<script>

import Register from './user/Register'
export default {
  name: 'MainPage',
  components: {
    Register
  },
  props: {
    msg: String
  }
}
</script>
