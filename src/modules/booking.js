import types from '@/types/booking'
import globalTypes from '@/types/global'
import Vue from 'vue'

const state = {
  movie: {},
  myBookings: null,
  selectedHour: null,
  movieShowingTimesId: null,
  lastBooking: null
}

const actions = {
  [types.actions.processReservation]: ({ commit, state}, seats) => {
    commit(globalTypes.mutations.startProcessing)

    return new Promise((resolve, reject) => {
      Vue.http.post('booking', {
        seats,
        movie_showing_time_id: state.movieShowingTimesId
      })
      .then(booking => {
        resolve(booking.data)
      })
      .catch(error => {
        reject(error)
      })
      .finally(() => {
        commit(globalTypes.mutations.stopProcessing)
      })
    })
  },
  [types.actions.fetchMovie]: ({ commit }, movieId) => {
    commit(globalTypes.mutations.startProcessing)

    return new Promise((resolve, reject) => {
      Vue.http.get(`movies/${movieId}/byMovie`)
      .then(movie => {
        commit(types.mutations.receivedMovie, { apiResponse: movie })
        resolve(movie.data)
      })
      .catch(error => {
        reject(error)
      })
      .finally(() => {
        commit(globalTypes.mutations.stopProcessing)
      })
    })
  },
  [types.actions.lastBooking]: ({ commit }) => {
    commit(globalTypes.mutations.startProcessing)

    return new Promise((resolve, reject) => {
      Vue.http.get('bookings/last')
      .then(booking => {
        commit(types.mutations.receivedLastBooking, { apiResponse: booking })
        resolve(booking.data)
      })
      .catch(error => {
        reject(error)
      })
      .finally(() => {
        commit(globalTypes.mutations.stopProcessing)
      })
    })
  },
  [types.actions.fetchMyBookings]: ({ commit }) => {
    commit(globalTypes.mutations.startProcessing)

    return new Promise((resolve, reject) => {
      Vue.http.get('bookings/all')
      .then(bookings => {
        commit(types.mutations.setMyBookings, { apiResponse: bookings })
        resolve(bookings)
      })
      .catch(error => {
        reject(error)
      })
      .finally(() => {
        commit(globalTypes.mutations.stopProcessing)
      })
    })
  }
}

const getters = {
  [types.getters.movie]: state => state.movie,
  [types.getters.booked]: state => {
    if (state.selectedHour) {
      return getBooked(state)
    }
  },
  [types.getters.seatsIds]: state => {
    let booked = getBooked(state)
    let seats = []

    if (booked.length) {
      booked.forEach(element => {
        if (element.seats.length) {
          element.seats.forEach(seat => {
            seats.push(seat.number)
          })
        }
      });
    }

    return seats
  },
  [types.getters.lastBooking]: state => {
    if (state.lastBooking) {
      return state.lastBooking.bookings[0]
    }
  },
  [types.getters.formattedBookings]: state => {
    let bookings = []
    
    if (state.myBookings && state.myBookings.length) {
      console.log('entro')
      state.myBookings.map(bookingApi => {
        let booking = {...bookingApi}
        let movie_showing_time = {...booking.movie_showing_time}
        let movie_showing = {...movie_showing_time.movie_showing}
        let movie = {...movie_showing.movie}

        bookings.push({
          id: booking.id,
          movie: movie.name,
          seats: booking.__meta__.seats_count,
          date: booking.made_date,
          hour: movie_showing_time.hour_to_show
        })
      })
    }
    
    return bookings
  }
}

const mutations = {
  [types.mutations.receivedMovie]: (state, { apiResponse }) => {
    state.movie = apiResponse.data
  },
  [types.mutations.setSelectedHour]: (state, hour) => {
    state.selectedHour = hour
    state.movieShowingTimesId = state.movie.movie_showing_times.filter(
      movie => movie.hour_to_show === hour)[0].movie_showing_id
  },
  [types.mutations.receivedLastBooking]: (state, { apiResponse }) => {
    state.lastBooking = apiResponse.body.data
  },
  [types.mutations.setMyBookings]: (state, { apiResponse }) => {
    state.myBookings = apiResponse.body.data.bookings
  }
}

function getBooked(state) {
  let booked;
  if (state.movie.movie_showing_times) {
    booked = state.movie.movie_showing_times.filter(
      movie_showing_time => movie_showing_time.hour_to_show === state.selectedHour
    )
  }

  if (booked && booked[0] && booked[0].hasOwnProperty('bookings')) {
    return booked[0].bookings
  } else {
    return []
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}