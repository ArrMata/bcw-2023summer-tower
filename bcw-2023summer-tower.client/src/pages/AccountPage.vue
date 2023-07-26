<template>
  <div class="row account-section m-0 text-light">
    <h2>My Events</h2>
    <div v-for="te in towerEvents" :key="te.id" class="col-md-3 col-12 p-3">
      <RouterLink :to="{name: 'Event', params: {eventId: te.id}}"><EventCard :te="te"/></RouterLink>
    </div>
    <h2>My Upcoming Events</h2>
    <div v-for="ticket in tickets" :key="ticket.id" class="col-md-3 col-12 p-3">
      <RouterLink :to="{name: 'Event', params: {eventId: ticket.eventId}}"><EventCard :te="ticket.event"/></RouterLink>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { AppState } from '../AppState';
import { towerEventsService } from '../services/TowerEventsService';
import { ticketsService } from '../services/TicketsService';
export default {
  setup() {

    const getAccountEvents = async() => {
      await towerEventsService.getAccountEvents()
    }
    const getAccountTickets = async() => {
      await ticketsService.getAccountTickets()
    }

    const clearTickets = () => {
      ticketsService.clearTickets()
    }

    onMounted(() => {
      getAccountEvents()
      getAccountTickets()
    })

    onUnmounted(() => {
      clearTickets()
    })

    return {
      account: computed(() => AppState.account),
      towerEvents: computed(() => AppState.towerEvents),
      tickets: computed(() => AppState.tickets)
    }
  }
}
</script>

<style lang="scss" scoped>


.account-section {
  overflow-y: scroll;
  max-height: 100vh;
}

</style>
