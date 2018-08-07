<template>
  <form
    autocomplete="off"
    @submit.prevent="validateBeforeSubmit()">

    <div class="form-group">
      <label class="control-label" for="email" v-html="$t('login.email')"></label>
      <div :class="{'has-error': errors.has('email')}">
        <input
          autocomplete="off"
          name="email"
          v-model="user.email"
          v-validate
          data-vv-rules="required|email"
          class="form-control" 
          type="text"
          id="email"
          :placeholder="$t('login.email')"
          :class="{ 'has-error': errors.has('email') }">

          <span 
            v-show="errors.has('email')"
            class="text-danger">
            {{ errors.first('email') }}
          </span>
      </div>
    </div>

    <div class="form-group" v-if="isProfile">
      <label class="control-label" for="email" v-html="$t('profile.username')"></label>
      <div :class="{'has-error': errors.has('email')}">
        <input
          autocomplete="off"
          name="username"
          v-model="user.username"
          v-validate
          data-vv-rules="required"
          class="form-control" 
          type="text"
          id="username"
          :placeholder="$t('profile.username')"
          :class="{ 'has-error': errors.has('username') }">

          <span 
            v-show="errors.has('username')"
            class="text-danger">
            {{ errors.first('username') }}
          </span>
      </div>
    </div>

    <div class="form-group" v-if="isRegister || isLogin">
      <label class="control-label" for="password" v-html="$t('register.password')"></label>
      <div :class="{'has-error': errors.has('password')}">
        <input
          autocomplete="off"
          name="password"
          ref="password"
          v-model="user.password"
          v-validate
          data-vv-rules="required|min:6"
          class="form-control" 
          type="password"
          id="password"
          :placeholder="$t('register.password')"
          :class="{ 'has-error': errors.has('password') }">

          <span 
            v-show="errors.has('password')"
            class="text-danger">
            {{ errors.first('password') }}
          </span>
      </div>
    </div>

    <div class="form-group" v-if="isRegister">
      <label class="control-label" for="password_confirmation" v-html="$t('register.password')"></label>
      <div :class="{'has-error': errors.has('password_confirmation')}">
        <input
          autocomplete="off"
          name="password_confirmation"
          v-model="user.password_confirmation"
          v-validate
          data-vv-rules="required|confirmed:password"
          class="form-control" 
          type="password"
          id="password_confirmation"
          :placeholder="$t('register.password_confirmation')"
          :class="{ 'has-error': errors.has('password_confirmation') }">

          <span 
            v-show="errors.has('password_confirmation')"
            class="text-danger">
            {{ errors.first('password_confirmation') }}
          </span>
      </div>
    </div>

    <hr>

    <button
      type="submit"
      class="btn btn-success btn-block"
      v-html="btnText"></button>

  </form>
</template>

<script>
import authTypes from '@/types/auth'
import { mapActions } from 'vuex'

export default {
  name: 'userForm',
  props: {
    user: {
      type: Object,
      required: true
    },
    isLogin: {
      type: Boolean
    },
    isRegister: {
      type: Boolean
    },
    isProfile: {
      type: Boolean
    },
    btnText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      error: null
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('processUserForm', this.user)
        }
      })
    }
  }
}
</script>

