<template>
  <div class="row">
    <div class="col-12">
      <h1 v-html="$t('booking.list')"></h1>
      <div v-if="formattedBookings">
        <v-client-table 
          name="bookingsTable" 
          :columns="columns" 
          :data="formattedBookings"
          :options="options">

        </v-client-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bookingTypes from '@/types/booking'

export default {
  name: 'bookings',
  data() {
    return {
      columns: ['id', 'movie', 'seats', 'date', 'hour'],
      options: {
        filterByColumn: true,
        perPage: 5,
        perPageValues: [5, 10, 15 , 20],
        headings: {
          id: 'ID',
          movie: this.$t('movie.name'),
          seats: this.$t('booking.seats'),
          date: this.$t('booking.date'),
          hour: this.$t('booking.hour')
        },
        texts: {
          columns: "Columnas",
          count: "Mostrando {from} a {to} de {count} registros|{count} registros|Un registro",
          defaultOption: "Selecciona {column}",
          filter: "Filtrar:",
          filterBy: "Filtrar por {column}",
          filterPlaceholder: "Buscar consulta",
          first: "Primero",
          last: "Último",
          limit: "Registros:",
          loading: "Cargando...",
          noResults: "No se han encontrado registros",
          page: "Página:"
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch(bookingTypes.actions.fetchMyBookings).then(() => {})
  },
  computed: {
    ...mapGetters({
      formattedBookings: bookingTypes.getters.formattedBookings
    })
  }
}
</script>

