<template>
  <div>
    <label>{{ $t('genre.name') }}</label>

    <div v-if="genres">
      <span class="badge badge-info mr-2" v-for="genre in genres" :key="genre.id">
        {{ genre.name }}
      </span>
    </div>
    <div v-else>
      <span class="badge badge-error">{{ $t('genre.empty') }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'movieGenres',
  props: {
    genres: {
      type: Array
    }
  }
}
</script>
