import namespace from '@/utils/namespace'

export default namespace('booking', {
  getters: [
    'movie',
    'booked',
    'seatsIds',
    'lastBooking',
    'formattedBookings'
  ],
  actions: [
    'fetchMovie',
    'processReservation',
    'lastBooking',
    'fetchMyBookings'
  ],
  mutations: [
    'receivedMovie',
    'setSelectedHour',
    'receivedLastBooking',
    'setMyBookings'
  ]
})