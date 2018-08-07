<template>
  <div id="app">
    <navigation></navigation>
    <div v-if="processing">
      <BlockUI :message="$t('messages.processing')"></BlockUI>
    </div>

    <div class="container mt-5 pt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import globalTypes from '@/types/global'
import { mapGetters } from 'vuex'
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Navigation
  },
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapGetters({
      processing: globalTypes.getters.processing
    })
  }
}
</script>