<template>
  <div class="row">
    <div class="col-md-3" id="filters">
      <movie-filter></movie-filter>
    </div>

    <div class="col-md-9" id="movies">
      <div v-if="movies && movies.length > 0">
        <h5 class="mb-4">Se han encontrado <span class="text-danger">{{ movies.length }}</span> coincidencia(s)</h5>
        <div v-for="(movie, index) in movies" :key="movie.id">
          <movie 
            :movie="movie" 
            :booking="true" 
            v-on:startReservation="reservation($event)"
            :key="index">
          </movie>
        </div>
      </div>

      <div v-else>
        <div class="alert alert-danger">
          <strong>{{ $t('movie.empty') }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moviesTypes from '@/types/movie'
import Movie from './Movie'
import MovieFilter from './MovieFilter'

export default {
  components: { Movie, MovieFilter },
  name: 'movies',
  mounted() {
    const cinemaId = this.$route.params.id
    this.fetchMovies(cinemaId)
  },
  methods: {
    ...mapActions({
      fetchMovies: moviesTypes.actions.fetchMovies
    }),
    reservation(movieId) {
      this.$router.push({ name: 'booking', params: { movieId: movieId }})
    }
  },
  computed: {
    ...mapGetters({
      movies: moviesTypes.getters.movies
    })
  }
}
</script>

