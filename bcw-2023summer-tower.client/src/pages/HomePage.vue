<template>
  <div class="row event-section m-0 p-3">
    <div class="col-12 hero-section p-0 h-50">
      <HeroSection />
    </div>
    <div class="col-12 p-3">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="divider">Event List</h3>
        <button class="secondary-button divider fs-4" data-bs-toggle="collapse" data-bs-target="#filterCollapse"><i class="mdi mdi-filter"></i>Filter</button>
      </div>
      <div class="collapse mt-3" id="filterCollapse">
        <div class="d-flex justify-content-end">
          <button :class="{'active-filter' : filter == ''}" @click="filter = ''" class="secondary-button">All</button>
          <button :class="{'active-filter' : filter == 'concert'}" @click="filter = 'concert'" class="secondary-button mx-2">Concert</button>
          <button :class="{'active-filter' : filter == 'convention'}" @click="filter = 'convention'" class="secondary-button">Convention</button>
          <button :class="{'active-filter' : filter == 'digital'}" @click="filter = 'digital'" class="secondary-button mx-2">Digital</button>
          <button :class="{'active-filter' : filter == 'sport'}" @click="filter = 'sport'" class="secondary-button">Sport</button>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="row">
        <div v-for="te in towerEvents" :key="te.id" class="col-md-3 col-12 py-3">
          <RouterLink :to="{name: 'Event', params: {eventId: te.id}}"><EventCard :te="te"/></RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import {towerEventsService} from '../services/TowerEventsService.js'
import { RouterLink } from 'vue-router';
import EventCard from '../components/EventCard.vue'
import HeroSection from '../components/HeroSection.vue'

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
  }, components: { EventCard, RouterLink, HeroSection }
}
</script>

<style scoped lang="scss">
.event-section {
  overflow-y: scroll;
  height: 100vh;
  flex-direction: column;
  flex-wrap: nowrap;
}

.hero-section {
  position: relative;
  width: 100%;
  border-radius: 1.25rem;
  border: var(--primary) solid 4px;
  color: var(--text);
  display: flex;
  align-items: end;
}

.secondary-button {
  background-color: var(--secondary);
  color: var(--text);
  border: none;
  padding: 0.25rem 0.55rem;
  border-radius: 1rem;
  transition: all 0.25s ease;
}

.secondary-button:hover {
  transform: translateY(-5px);
  background-color: var(--primary);
  box-shadow: 0px 0px 15px var(--hover-highlight);
}

.active-filter {
  background-color: var(--primary);
}

</style>
