<template>
  <div class="col-12 table-responsive">
    <table class="table table-bordered">
      <tr v-for="(row, index) in room.rows" :key="index">
        <td
          align="center"
          v-for="(seat, index) in seatsPerRow"
          :key="index"
          v-bind:class="{
            booked: seatsIds.includes(currentSeat(row, seat)),
            selected: pendingBooked.indexOf(`${row}-${currentSeat(row, seat)}`) > -1
          }"
          @click="selectSeat(row, currentSeat(row, seat), seat)">
          {{ currentSeat(row, seat) }}
        </td>
      </tr>
    </table>

    <div v-if="pendingBooked.length">
      <hr>
      <button class="btn btn-warning btn-block" @click="processBooked">
        {{ $t('booking.process_book') }}
      </button>
      <hr>
    </div>
  </div>
</template>

<style scoped>
  table {
    background: #20c997;
    cursor: pointer;
  }

  .booked {
    background: #dc3545;
  }

  .selected {
    background: #ffc107;
  }
</style>


<script>
import { mapActions } from 'vuex'
import types from '@/types/booking'

export default {
  name: 'bookingSeats',
  props: {
    room: {
      type: Object,
      required: true
    },
    seatsIds: {
      type: Array
    }
  },
  data() {
    return {
      pendingBooked: []
    }
  },
  methods: {
    ...mapActions({
      processReservation: types.actions.processReservation,
    }),
    processBooked() {
      this.processReservation(this.pendingBooked).then(() => {
        this.$router.push({ name: 'booking-last' })
      })
    },
    currentSeat(row, seat) {
      return row === 1 ? seat : parseInt(((row - 1) * 10)) + parseInt(seat)
    },
    selectSeat(row, currentSeat, seat) {
      if (this.seatsIds.includes(this.currentSeat(row, seat))) return

      const booked = `${row}-${currentSeat}`

      if (this.pendingBooked.indexOf(booked) > -1) {
        this.pendingBooked.splice(this.pendingBooked.indexOf(booked), 1)
      } else {
        this.pendingBooked.push(booked)
      }
    }
  },
  computed: {
    seatsPerRow() {
      return this.room.seats / this.room.rows
    }
  }
}
</script>
