<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">CineVue.js</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">{{ $t('navigation.cinema') }}</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/profile" v-if="isLogged">{{ $t('navigation.my_account') }}
        </router-link></li>
        <li class="nav-item">
          <router-link class="nav-link" to="/bookings" v-if="isLogged">{{ $t('navigation.bookings') }}</router-link>
        </li>
        <lang-selector></lang-selector>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/login" v-if="!isLogged">{{ $t('navigation.login') }}</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register" v-if="!isLogged">{{ $t('navigation.register') }}</router-link>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click.prevent="logout()" v-if="isLogged">{{ $t('navigation.logout') }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import authTypes from '@/types/auth'
import LangSelector from './LangSelector'

export default {
  components: { LangSelector },
  name: 'navigation',
  methods: {
    ...mapActions({
      _logout: authTypes.actions.logout
    }),
    logout() {
      this._logout()
      this.$router.push({ name: 'login'})
    }
  },
  computed: {
    ...mapGetters({
      isLogged: authTypes.getters.logged
    })
  }
}
</script>
