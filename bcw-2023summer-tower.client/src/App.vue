<template>
  <main class="container-fluid">
    <div class="row">
      <Sidebar/>
      <router-view class="col-md-10 col-12"/>
    </div>
  </main>
  <!-- Modal Body -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div class="modal fade" id="CreateEventForm" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header" data-bs-theme="dark" >
          <h5 class="modal-title" id="modalTitleId">Create an Event!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div class="modal-body">
                <form @submit.prevent="createEvent">
                  <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input required minlength="3" maxlength="75" v-model="editable.name" type="text"  class="form-control" placeholder="Event Name...">
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <input maxlength="1000" v-model="editable.description" type="text" class="form-control" placeholder="Event Description...">
              </div>
              <div class="mb-3">
                <label class="form-label">Cover Image</label>
                <input required type="url" maxlength="300" v-model="editable.coverImg" class="form-control" placeholder="Event Image...">
              </div>
              <div class="mb-3">
                <label class="form-label">Location</label>
                <input required type="text" maxlength="200" v-model="editable.location" class="form-control" placeholder="Event Location...">
              </div>
              <div class="mb-3">
                <label class="form-label">Total Capacity</label>
                <input required type="number" min="1" max="100000000" v-model="editable.capacity" class="form-control" placeholder="Event Capacity...">
              </div>
              <div class="mb-3">
                <label class="form-label">Start Date and Time</label>
                <div>
                  <input required type="date" v-model="editable.date">
                  <input required type="time" v-model="editable.time">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Event Type</label>
                <select v-model="editable.type" required class="form-select">
                  <option v-for="type in types" :key="type" :value="type">{{ type }}</option>

                </select>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from './AppState'
import Sidebar from './components/Sidebar.vue';
import { towerEventsService } from './services/TowerEventsService';
import { router } from './router';
import { Modal } from 'bootstrap';

export default {
  setup() {
    const editable = ref({})

    return {
      appState: computed(() => AppState),
      editable,
      types: ['concert', 'convention', 'sport', 'digital'],
      async createEvent() {
        const towerEvent = await towerEventsService.createEvent(editable.value)
        editable.value = {}
        Modal.getOrCreateInstance('#CreateEventForm').hide()
        router.push({name: 'Event', params: { eventId:towerEvent.id }})
      }
    }
  },
  components: { Sidebar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import url('https://fonts.googleapis.com/css2?family=Lobster&family=Ubuntu:wght@300;400;700&display=swap');

:root{
  --text: #ffffff;
  --text-unselected: #c5c5c5;
  --background: #222835;
  --primary: #9200b7;
  --secondary: #354556;
  --accent: #e79fff;
  --hover-highlight: rgba(128, 128, 128, 0.43);
}

main {
  background-color: var(--background);
  font-family: 'Ubuntu', sans-serif;
  color: var(--text);
}

.color-primary {
  color: var(--primary);
}

.divider {
  font-weight: 300;
}

.modal-content {
  background-color: var(--background);
  color: var(--text);
}

// font-family: 'Lobster', cursive;
// font-family: 'Ubuntu', sans-serif;

</style>
