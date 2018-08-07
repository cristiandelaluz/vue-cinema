<template>
  <div class="row">
    <div class="col-md-3" id="filters">
      <cinema-filter></cinema-filter>
    </div>

    <div class="col-md-9" id="cinemas">
      <h5 class="mb-4">Se han encontrado <span class="text-danger">{{ cinemas.length }}</span> coincidencia(s)</h5>
      <div v-if="cinemas.length > 0">
        <div v-for="(cinema, index) in cinemas" :key="index">
          <cinema :cinema="cinema"></cinema>
        </div>
      </div>

      <div v-else>
        <div class="alert alert-danger">
          <strong>{{ $t('cinema.empty') }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cinemaTypes from '@/types/cinema'
import { mapGetters } from 'vuex'
import Cinema from './Cinema'
import CinemaFilter from './CinemaFilter'

export default {
  components: { Cinema, CinemaFilter },
  name: 'cinemas',
  mounted() {
    this.$store.dispatch(cinemaTypes.actions.fetchCinemas)
  },
  computed: {
    ...mapGetters({
      cinemas: cinemaTypes.getters.cinemas
    })
  }
}
</script>
