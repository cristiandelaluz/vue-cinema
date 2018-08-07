<template>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ $t('navigation.language') }} ({{ currentLang }}) <span class="caret"></span>
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li v-for="(language, index) in languages" :key="index">
        <a class="dropdown-item" href="#" @click.prevent="updateLanguage(language.value)">{{ language.label }}</a>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import globalTypes from '@/types/global'

export default {
  name: 'languageselector',
  data() {
    return {
      selectedLanguage: 'es',
      languages: [
        {
          value: 'es', label: 'Español'
        },
        {
          value: 'en', label: 'Inglés'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      setLanguage: globalTypes.actions.changeLanguage
    }),
    updateLanguage(language) {
      this.selectedLanguage = language
      this.setLanguage(this.selectedLanguage)
      this.$i18n.locale = this.selectedLanguage
    }
  },
  computed: {
    currentLang() {
      return this.languages.filter(language => language.value === this.selectedLanguage)[0].label
    }
  }
}
</script>

