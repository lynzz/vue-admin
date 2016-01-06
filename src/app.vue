<template>
  <div>
    <div v-if="!isLoginPage">
      <header-view></header-view>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import headerView from './views/header.vue'

export default {
  data () {
    return {
      authenticating: false
    }
  },
  computed: {
    isLoginPage() {
      return this.$route.path.indexOf('/login') > -1;
    }
  },
  components: {
    headerView
  }
}</script>
