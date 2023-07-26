<template>
  <div class="row event-section m-0">
    <div class="col-12 p-3">
      <p class="text-light fs-2">Filter</p>
      <button @click="filter = ''" class="btn btn-secondary">All</button>
      <button @click="filter = 'concert'" class="btn btn-secondary mx-2">Concert</button>
      <button @click="filter = 'convention'" class="btn btn-secondary">Convention</button>
      <button @click="filter = 'digital'" class="btn btn-secondary mx-2">Digital</button>
      <button @click="filter = 'sport'" class="btn btn-secondary">Sport</button>
    </div>
    <div v-for="te in towerEvents" :key="te.id" class="col-md-3 col-12 p-3">
      <RouterLink :to="{name: 'Event', params: {eventId: te.id}}"><EventCard :te="te"/></RouterLink>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import {towerEventsService} from '../services/TowerEventsService.js'
import { RouterLink } from 'vue-router';
import EventCard from '../components/EventCard.vue'

export default {
  setup() {
    const filter = ref("")
    const getTowerEvents = async() => {
      await towerEventsService.getTowerEvents()
    }

    onMounted(() => {
      getTowerEvents()
    })

    return {
      filter,
      towerEvents: computed(() => {
        if (!filter.value)
          return AppState.towerEvents
        else
          return AppState.towerEvents.filter(te => te.type == filter.value)
      })
    }
  }, components: { EventCard, RouterLink }
}
</script>

<style scoped lang="scss">
.event-section {
  overflow-y: scroll;
  max-height: 100vh;
}

</style>
