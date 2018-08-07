<template>
  <div class="row mb-4">
    <div class="col-4">
      <img class="rounded" :src="movie.movie.screenshot" alt="Card image cap" width="100%">

      <button 
        v-if="canBooking && booking"
        @click="$emit('startReservation', movie.movie.id)" 
        class="btn btn-warning btn-block mt-3">
        {{ $t('movie.reservation') }}
      </button>
    </div>

    <div class="col-8">
      <h5>
        {{ $t('movie.name') }}: {{ movie.movie.name }}
      </h5>
      <p class="card-text">
        <strong>{{ $t('movie.director') }}: {{ movie.movie.director }}</strong>
      </p>
      <p>{{ $t('movie.synopsis') }}: {{ movie.movie.synopsis }}</p>
      <p>{{ $t('movie.room_number') }}: {{ movie.room.number }}</p>
      <p>{{ $t('movie.room_rows') }}: {{ movie.room.rows }}</p>
      <p>{{ $t('movie.room_seats') }}: {{ movie.room.seats }}</p>

      <div class="row">
        <div class="col-md-6">
          <movie-genres :genres="movie.movie.genres"></movie-genres>
        </div>

        <div class="col-md-6">
          <movie-showing-times
            v-on:selectHour="$emit('selectHour', $event)"
            :showing_times="movie.movie_showing_times">
          </movie-showing-times>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieGenres from './MovieGenres'
import MovieShowingTimes from './MovieShowingTimes'

export default {
  components: { MovieGenres, MovieShowingTimes },
  name: 'movie',
  props: {
    movie: {
      type: Object,
      required: true
    },
    booking: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    canBooking() {
      return this.movie.movie_showing_times.length > 0
    }
  }
}
</script>
