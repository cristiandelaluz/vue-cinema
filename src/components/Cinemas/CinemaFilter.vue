<template>
  <div class="sticky">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title" v-html="$t('filter.cinema')"></h3>
      </div>
      <div class="card-body">
        <input type="text"
          v-model="search"
          class="form-control"
          :placeholder="$t('filter.search')" />

        <div class="form-group mt-2">
          <small class="text-muted"><label v-html="$t('filter.rooms')"></label></small>
          <select v-model="rooms" class="form-control">
            <option v-for="(room, index) in [5,10,25,100]" :value="room" :key="index">{{ room }}</option>
          </select>
        </div>

        <div class="form-group mt-2">
          <small class="text-muted"><label v-html="$t('filter.seats')"></label></small>
          <select v-model="seats" class="form-control">
            <option v-for="(seat, index) in [100,200,300,400,500,600,700,800,900,1000]" :value="seat" :key="index">{{ seat }}</option>
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
import { mapGetters, mapMutations } from 'vuex'
import cinemaTypes from '@/types/cinema'

export default {
  name: 'cinemaFilter',
  methods: {
    ...mapMutations({
      setSearch: cinemaTypes.mutations.setSearch,
      setRooms: cinemaTypes.mutations.setRooms,
      setSeats: cinemaTypes.mutations.setSeats,
      clearFilter: cinemaTypes.mutations.clearFilter
    })
  },
  computed: {
    ...mapGetters({
      query: cinemaTypes.getters.search,
      numberOfRooms: cinemaTypes.getters.rooms,
      numberOfSeats: cinemaTypes.getters.seats
    }),
    search: {
      get() {
        return this.query
      },
      set(value) {
        this.setSearch(value)
      }
    },
    rooms: {
      get() {
        return this.numberOfRooms
      },
      set(value) {
        this.setRooms(value)
      }
    },
    seats: {
      get() {
        return this.numberOfSeats
      },
      set(value) {
        this.setSeats(value)
      }
    }
  }
}
</script>
