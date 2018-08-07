<template>
  <div class="row justify-content-center">
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          <h3 class="text-center text-muted"
              v-html="$t('register.title')">
          </h3>
        </div>
        <div class="card-body">
          <div class="alert alert-danger" v-if="error" v-html="$t('login.error')"></div>

          <user-form
            :user="user"
            :btnText="$t('register.title')"
            :isRegister="true"
            v-on:processUserForm="processRegister($event)">
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
  name: 'register',
  components: { UserForm },
  data() {
    return {
      user: {
        email: '',
        password: '',
        password_confirmation: ''
      },
      error: null
    }
  },
  methods: {
    ...mapActions({
      register: authTypes.actions.register
    }),
    processRegister(user) {
      this.register({
        email: user.email,
        password: user.password
      })
      .then(result => {
        this.$router.push('/login')
      }, error => {
        this.error = true
      })
    }
  }
}
</script>

