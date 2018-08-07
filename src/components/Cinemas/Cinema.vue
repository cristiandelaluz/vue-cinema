<template>
  <div class="row mb-4">
    <div class="col-4">
      <img class="rounded" :src="cinema.screenshot" alt="Card image cap" width="100%">
    </div>

    <div class="col-8">
      <h5>
        <router-link :to="{ name: 'cinema', params: { id: cinema.id }}">{{ $t('cinema.name') }}: {{ cinema.name }}</router-link>
      </h5>
      <p class="card-text">
        <strong>{{ $t('cinema.address') }}: {{ cinema.address }}</strong>
      </p>
      <p>{{ $t('cinema.details') }}: {{ cinema.details }}</p>
      <p>{{ $t('cinema.telephone') }}: {{ cinema.phone }}</p>
      <p>{{ $t('cinema.seats') }}: {{ cinema.seat_capacity }}</p>
      <p>{{ $t('cinema.rooms') }}: {{ cinema.__meta__.number_of_rooms }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'cinema',
  props: {
    cinema: {
      type: Object,
      required: true
    }
  }
}
</script>

