<template>
  <div v-if="booking">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          {{ $t('cinema.name') }}: {{ booking.movie_showing_time.movie_showing.cinema.name }}
        </h3>
      </div>
      <div class="card-body">
        <p>{{ $t('cinema.address') }}: {{ booking.movie_showing_time.movie_showing.cinema.address }}</p>
        <p>{{ $t('cinema.telephone') }}: {{ booking.movie_showing_time.movie_showing.cinema.phone }}</p>
        <p>{{ $t('cinema.seats') }}: {{ booking.movie_showing_time.movie_showing.cinema.seat_capacity }}</p>

        <h3>{{ $t('movie.name') }} {{ booking.movie_showing_time.movie_showing.movie.name }}</h3>
        <h5>{{ $t('booking.date') }}: {{ booking.made_date }}</h5>
      </div>
      <div class="card-footer">
        <p class="text-muted">
          {{ $t('booking.seats') }}: {{ booking.seat_count }}
        </p>
        <ul>
          <li v-for="(seat, index) in booking.seats" :key="index">
            {{ $t('booking.row') }}: {{ seat.row }}
            {{ $t('booking.seat') }}: {{ seat.number}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import bookingTypes from '@/types/booking'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'bookingLast',
  mounted() {
    this.lastBooking()
  },
  methods: {
    ...mapActions({
      lastBooking: bookingTypes.actions.lastBooking
    })
  },
  computed: {
    ...mapGetters({
      booking: bookingTypes.getters.lastBooking
    })
  }
}
</script>
