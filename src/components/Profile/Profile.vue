<template>
  <div class="row justify-content-center">
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          <h3 class="text-center text-muted"
              v-html="$t('profile.title')">
          </h3>
        </div>
        <div class="card-body">
          <div class="alert alert-success" v-if="success" v-html="$t('profile.updated')"></div>
          <div class="alert alert-danger" v-if="error" v-html="$t('profile.error')"></div>

          <user-form
            :user="{ email: email, username: username }"
            :btnText="$t('profile.title')"
            :isProfile="true"
            v-on:processUserForm="processProfile($event)"></user-form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import authTypes from '@/types/auth'
import { mapActions, mapGetters } from 'vuex'
import UserForm from '../Auth/UserForm'

export default {
  name: 'profile',
  components: { UserForm },
  data() {
    return {
      success: null,
      error: null
    }
  },
  computed: {
    ...mapGetters({
      userLogged: authTypes.getters.user
    }),
    email: {
      get() {
        return this.userLogged.data.email
      },
      set(email) {
        this.userLogged.data.email = email
      }
    },
    username: {
      get() {
        return this.userLogged.data.username
      },
      set(username) {
        this.userLogged.data.username = username
      }
    }
  },
  methods: {
    ...mapActions({
      updateProfile: authTypes.actions.updateProfile
    }),
    processProfile(user) {
      this.updateProfile({
        email: user.email,
        username: user.username
      })
      .then(
        res => {
          this.success = true
          this.error = false
      },
        error => {
          this.error = true
          this.success = false
      })
    }
  }
}
</script>

