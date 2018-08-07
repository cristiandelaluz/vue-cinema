import namespace from '@/utils/namespace'

export default namespace('movie', {
  getters: [
    'movies',
    'search',
    'rows',
    'seats',
    'genres',
    'genre',
    'hour'
  ],
  actions: [
    'fetchMovies',
    'fetchGenres'
  ],
  mutations: [
    'receivedMovies',
    'receivedGenres',
    'setSearch',
    'setRows',
    'setSeats',
    'setHour',
    'setGenre',
    'clearFilter'
  ]
})