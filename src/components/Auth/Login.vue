<template>
  <div class="row justify-content-center">
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          <h3 class="text-center text-muted"
              v-html="$t('login.title')">
          </h3>
        </div>
        <div class="card-body">
          <div class="alert alert-danger" v-if="error" v-html="$t('login.error')"></div>

          <user-form
            :user="user"
            :btnText="$t('login.title')"
            :isLogin="true"
            v-on:processUserForm="processLogin($event)">
          </user-form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import authTypes from '@/types/auth'
import { mapActions } from 'vuex'
import UserForm from '@/components/Auth/UserForm'

export default {
  name: 'login',
  components: { UserForm },
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      error: null
    }
  },
  methods: {
    ...mapActions({
      login: authTypes.actions.login
    }),
    processLogin(user) {
      console.log(user)
      this.login({
        email: user.email,
        password: user.password
      })
      .then(
        user => {
          this.$router.push('/')
        }, 
        error => {
          this.error = true
        }
      )
    }
  }
}
</script>


