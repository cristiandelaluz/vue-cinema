<template>
  <div class="sticky">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title" v-html="$t('filter.movie')"></h3>
      </div>
      <div class="card-body">
        <input type="text"
          v-model="search"
          class="form-control"
          :placeholder="$t('filter.search')" />

        <div class="form-group mt-2">
          <small class="text-muted"><label v-html="$t('filter.rows')"></label></small>
          <select v-model="rows" class="form-control">
            <option v-for="(row, index) in [1,2,3,4,5,6,7,8,9,10,11,12]" :value="row" :key="index">{{ row }}</option>
          </select>
        </div>

        <div class="form-group mt-2">
          <small class="text-muted"><label v-html="$t('filter.seats')"></label></small>
          <select v-model="seats" class="form-control">
            <option v-for="(seat, index) in [10,20,30,40,50,60,70,80,90,100]" :value="seat" :key="index">{{ seat }}</option>
          </select>
        </div>

        <div class="form-group mt-2">
          <small class="text-muted"><label v-html="$t('filter.genres')"></label></small>
          <select v-model="genre" class="form-control">
            <option v-for="(genre, index) in genres" :value="genre.id" :key="index">{{ genre.name }}</option>
          </select>
        </div>

        <div class="form-group mt-2">
          <small class="text-muted"><label v-html="$t('filter.hours')"></label></small>
          <select v-model="hour" class="form-control">
            <option v-for="(h, index) in hours" :value="h.val" :key="index">{{ h.text }}</option>
          </select>
        </div>

        <hr>

        <button 
          class="btn btn-block btn-warning"
          @click="clearFilter()">{{ $t('filter.clear') }}</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 100px;
  }
</style>

<script>
import movieTypes from '@/types/movie'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'movieFilter',
  mounted() {
    this.fetchGenres()
  },
  methods: {
    ...mapActions({
      fetchGenres: movieTypes.actions.fetchGenres
    }),
    ...mapMutations({
      setSearch: movieTypes.mutations.setSearch,
      setRows: movieTypes.mutations.setRows,
      setSeats: movieTypes.mutations.setSeats,
      setHour: movieTypes.mutations.setHour,
      setGenre: movieTypes.mutations.setGenre,
      clearFilter: movieTypes.mutations.clearFilter,
    })
  },
  computed: {
    hours() {
      let hours = [], i = 0
      for (i; i < 24; i++) {
        let hour = i < 10 ? `0${i}` : i
        hours.push({ 
          val: i,
          text: `${hour}:00`
        })
      }
      return hours
    },
    ...mapGetters({
      query: [movieTypes.getters.search],
      numberOfRows: [movieTypes.getters.rows],
      numberOfSeats: [movieTypes.getters.seats],
      selectedHour: [movieTypes.getters.hour],
      genres: [movieTypes.getters.genres],
      selectedGenre: [movieTypes.getters.genre]
    }),
    hour: {
      get() {
        return this.selectedHour
      },
      set(value) {
        this.setHour(value)
      }
    },
    search: {
      get() {
        return this.query
      },
      set(value) {
        this.setSearch(value)
      }
    },
    rows: {
      get() {
        return this.numberOfRows
      },
      set(value) {
        this.setRows(value)
      }
    },
    seats: {
      get() {
        return this.numberOfSeats
      },
      set(value) {
        this.setSeats(value)
      }
    },
    genre: {
      get() {
        return this.selectedGenre
      },
      set(value) {
        this.setGenre(value)
      }
    },
  }
}
</script>
