<template>
  <div>
    <label>{{ $t('movie_showing_times.name') }}</label>

    <div v-if="showing_times.length > 0">
      <span 
        @click="$emit('selectHour', showing_times[0].hour_to_show)"
        class="badge badge-danger"
        v-for="(showing_time, index) in showing_times" :key="index">
        {{ showing_time.hour_to_show }}
      </span>
    </div>
    <div v-else>
      <span class="badge badge-danger">
        {{ $t('movie_showing_times.empty') }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'movieShowingTimes',
  props: {
    showing_times: {
      type: Array
    }
  }
}
</script>

