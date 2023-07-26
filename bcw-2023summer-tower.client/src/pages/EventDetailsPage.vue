<template>
    <div v-if="activeEvent" class="row details-section m-0">
        <div class="col-12 event-info text-light">
            <img :src="activeEvent.coverImg" class="img-fluid" :alt="activeEvent.name">
            <h2> {{ activeEvent.name }}</h2>
            <h3> {{ activeEvent.location }}</h3>
            <h3> {{ activeEvent.startDate.toLocaleDateString() }}</h3>
            <h3> {{ "Starting at "+ activeEvent.startDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}) }}</h3>
            <p> {{ activeEvent.description }}</p>
            <p> {{ (activeEvent.capacity - activeEvent.ticketCount) + " spots left" }}</p>
            <button v-if="activeEvent.isCanceled" disabled class="btn btn-secondary fs-3"><i class="mdi mdi-account-cancel"></i>Event Cancelled</button>
            <button v-else-if="isAttending" @click="unattendEvent" class="btn btn-danger fs-3"><i class="mdi mdi-account-minus me-2"></i>Not Attending</button>
            <button v-else-if="(activeEvent.capacity - activeEvent.ticketCount) == 0" disabled class="btn btn-secondary fs-3"><i class="mdi mdi-account-cancel"></i>Event At Capacity</button>
            <button v-else @click="attendEvent" class="btn btn-primary fs-3"><i class="mdi mdi-account-plus me-2"></i>Attend</button>
            <button @click="cancelEvent" v-if="!activeEvent.isCanceled && activeEvent.creatorId == account.id" class="btn btn-danger fs-3">Cancel Event</button>
            <button disabled v-else-if="activeEvent.isCanceled && activeEvent.creatorId == account.id" class="btn btn-danger fs-3">Already Cancelled</button>
        </div>
        <div v-if="tickets" class="col-12 d-flex">
            <img v-for="ticket in tickets" :key="ticket.id" class="ticket-avatar" :title="ticket.profile?.name" :src="ticket.profile.picture">
        </div>
        <div class="col-md-6 col-12 mx-auto">
            <form @submit.prevent="createComment">
                <div class="mb-3 d-flex">
                    <input v-model="commentBody" type="text" minLength="5" maxlength="500" class="form-control" 
                    aria-describedby="helpId" required placeholder="Share your thoughts...">
                    <button type="submit" class="d-flex btn btn-primary">Post<i class="ms-1 mdi mdi-send-variant"></i></button>
                </div>
            </form>
            <div class="d-flex justify-content-start align-items-center px-4 bg-light mb-3" v-for="comment in comments" :key="comment.id">
                <img class="ticket-avatar me-2" :src="comment.creator.picture" :alt="comment.creator.name">
                <div>
                    <h5>{{ comment.creator.name }}</h5>
                    <p>{{ comment.body }}</p>
                </div>
                <i @click="deleteComment(comment.id)" role="button" v-if="comment.creatorId == account.id" class="ms-auto fs-1 text-danger mdi mdi-trash-can"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService';
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { commentsService } from '../services/CommentsService'
import { ticketsService } from '../services/TicketsService'
import Pop from '../utils/Pop';



export default {
    setup() {
        const route = useRoute()
        const commentBody = ref("")
        const getEvent = async() => {
            await towerEventsService.getTowerEventById(route.params.eventId)
        }
        const getComments = async() => {
            await commentsService.getCommentsByEventId(route.params.eventId)
        }
        const getTickets = async() => {
            await ticketsService.getTicketsByEventId(route.params.eventId)
        }
        
        onMounted(() => {
            getEvent()
            getComments()
            getTickets()
        })

        return {
            account: computed(() => AppState.account),
            activeEvent: computed(() => AppState.activeTowerEvent),
            comments: computed(() => AppState.comments),
            commentBody,
            tickets: computed(() => AppState.tickets),
            async attendEvent() {
                await ticketsService.createTicket(route.params.eventId)
                AppState.activeTowerEvent.ticketCount++
            },
            async unattendEvent(){
                await ticketsService.deleteTicket()
                AppState.activeTowerEvent.ticketCount--
            },
            async createComment(){
                await commentsService.createComment(commentBody.value, route.params.eventId)
                commentBody.value = ""
            },
            async deleteComment(commentId) {
                const wantsToDelete = await Pop.confirm('Delete this comment')
                if (wantsToDelete)
                    await commentsService.deleteComment(commentId)
            },
            async cancelEvent(){
                const wantsToDelete = await Pop.confirm('Cancel this event?')
                if (wantsToDelete)
                    await towerEventsService.cancelEvent(route.params.eventId)
            },
            isAttending: computed(() => {
                if (AppState.account)
                    return AppState.tickets.find(ticketData => ticketData.accountId == AppState.account.id)
                else return false
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.details-section {
  overflow-y: scroll;
  height: 100vh;
}

.ticket-avatar {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
}

</style>