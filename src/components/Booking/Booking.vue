<template>
  <div class="row" v-if="movie && movie.movie">
    <div class="col-12">
      <movie 
      :booking="false" 
      v-on:selectHour="showSeats($event)" 
      :movie="movie"></movie>
    </div>
    
    <div v-if="booked" class="col-12">
      <h1 class="text-center mb-4">{{ $t('booking.screen_info') }}</h1>
      <booking-seats :seatsIds="seatsIds" :room="movie.room"></booking-seats>
    </div>
  </div>
</template>

<script>
import bookingTypes from '@/types/booking'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Movie from '@/components/Movies/Movie'
import BookingSeats from './BookingSeats'

export default {
  name: 'booking',
  components: { Movie, BookingSeats },
  mounted() {
    const movieId = this.$route.params.movieId

    this.fetchMovie(movieId).catch(() => {
      this.$router.back()
    })
  },
  methods: {
    ...mapActions({
      fetchMovie: bookingTypes.actions.fetchMovie
    }),
    ...mapMutations({
      setSelectedHour: bookingTypes.mutations.setSelectedHour
    }),
    showSeats(hour) {
      this.setSelectedHour(hour)
    }
  },
  computed: {
    ...mapGetters({
      movie: bookingTypes.getters.movie,
      booked: bookingTypes.getters.booked,
      seatsIds: bookingTypes.getters.seatsIds
    })
  }
}
</script>
