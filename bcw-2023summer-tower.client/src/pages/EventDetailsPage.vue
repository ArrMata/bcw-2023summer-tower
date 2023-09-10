<template>
    <div v-if="activeEvent" class="row details-section m-0">
        <div class="col-12 event-block mt-3 px-0">
            <img class="event-bg-image" :src="activeEvent.coverImg" :alt="activeEvent.name">
            <div class="row event-info d-flex p-4">
                <div class="col-md-5 col-12 event-img-container">
                    <img class="img-fluid event-img" :src="activeEvent.coverImg" :alt="activeEvent.name">
                </div>
                <div class="col-md-7 col-12 px-3 mt-md-0 mt-3">
                    <div class="d-flex flex-column h-100">
                        <div>
                            <div class="mb-3 mb-md-0 d-flex justify-content-between">
                                <h2 class="fs-2"> {{ activeEvent.name }}</h2>
                                <button @click="cancelEvent" v-if="!activeEvent.isCanceled && activeEvent.creatorId == account.id" class="btn btn-danger fs-3">Cancel Event</button>
                            </div>
                            <h3 class="fs-4"> {{ activeEvent.location }}</h3>
                            <h3 class="fs-4"> {{ activeEvent.startDate.toLocaleDateString() }}</h3>
                            <h3 class="fs-4"> {{ "Starting at "+ activeEvent.startDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}) }}</h3>
                            <p class="custom-fs-6 event-description"> {{ activeEvent.description }}</p>
                        </div>
                        <div class="mt-auto d-flex justify-content-between align-items-end">
                            <div>
                                <p v-if="activeEvent.isCanceled" class="fs-2 mb-0 text-danger">Event is cancelled</p>
                                <p v-else-if="(activeEvent.capacity - activeEvent.ticketCount) < 1" class="fs-2 mb-0 text-danger">At Capacity</p>
                                <p v-if="!activeEvent.isCanceled" class="fs-2 mb-0"> {{ (activeEvent.capacity - activeEvent.ticketCount) + " spots left" }}</p>
                            </div>
                                <div v-if="account.id">
                                <button v-if="isAttending" @click="unattendEvent" class="btn btn-danger fs-3"><i class="mdi mdi-account-minus me-2"></i>Not Attending</button>
                                <button v-else-if="activeEvent.isCanceled" disabled class="btn btn-secondary fs-3"><i class="mdi mdi-account-cancel"></i>Event Cancelled</button>
                                <button v-else-if="(activeEvent.capacity - activeEvent.ticketCount) == 0" disabled class="btn btn-secondary fs-3"><i class="mdi mdi-account-cancel"></i>Event At Capacity</button>
                                <button v-else @click="attendEvent" class="btn btn-primary fs-3"><i class="mdi mdi-account-plus me-2"></i>Attend</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="tickets.length > 0" class="col-12 mt-3">
            <p class="fs-3">Attendee List</p>
            <div class="d-flex flex-wrap attendee-block p-2">
                <div v-for="ticket in tickets" :key="ticket.id" class="tooltip-container mb-auto">
                    <span class="tagtooltip">{{ ticket.profile?.name }}</span>
                    <img class="ticket-avatar" :title="ticket.profile?.name" :src="ticket.profile.picture">
                </div>
            </div>
        </div>
        <div class="col-md-6 col-12 mx-auto mt-4">
            <p class="fs-3">See what people are saying</p>
            <form v-if="!activeEvent.isCanceled && account.id" @submit.prevent="createComment">
                <div class="mb-3 d-flex">
                    <input v-model="commentBody" type="text" minLength="5" maxlength="500" class="form-control" 
                    aria-describedby="helpId" required placeholder="Share your thoughts...">
                    <button type="submit" class="d-flex btn btn-primary">Post<i class="ms-1 mdi mdi-send-variant"></i></button>
                </div>
            </form>
            <p v-if="comments.length < 1">No comments found...</p>
            <div v-else class="comment d-flex justify-content-start align-items-center px-4 py-3t mb-3" v-for="comment in comments" :key="comment.id">
                <img class="ticket-avatar me-2" :src="comment.creator.picture" :alt="comment.creator.name">
                <div>
                    <h5 class="mb-0 mt-3">{{ comment.creator.name }}</h5>
                    <p class="mb-3">{{ comment.body }}</p>
                </div>
                <i @click="deleteComment(comment.id)" role="button" v-if="comment.creatorId == account.id" class="ms-auto fs-1 text-danger mdi mdi-trash-can"></i>
            </div>
        </div>

    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService';
import { computed, ref, watchEffect } from 'vue';
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
        
        watchEffect(() => {
            getEvent()
            getComments()
            getTickets()
        })

        return {
            account: computed(() => AppState.account),
            route,
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

.tooltip-container {
    display: inline-block;
    position: relative;
}

.tooltip-container .tagtooltip {
    visibility: hidden;
    opacity: 0;
    transition: 0.2s all ease;
    background-color: var(--primary);
    color: var(--text);
    font-style: normal;
    border-radius: 5px;
    padding: 0.1rem 0.75rem;
    bottom: -25%;
    left: -5%;
    position: absolute;
    z-index: 4;
}

.tooltip-container:hover .tagtooltip {
    visibility:visible;
    opacity: 1;
}

.event-block {
    position: relative;
    border: 10px solid var(--primary);
    border-radius: 1rem;
    height: 80%;
    @media screen and (max-width: 768px) {
        height: auto;
    }
}

.event-info {
    position: relative;
    z-index: 1;
    height: 100%;
}

.event-description { 
    white-space: pre-wrap;
}

.event-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    border: 2px solid var(--text);
}
.event-img-container {
    @media screen and (min-width: 768px) {
        height: 100%;
    }
}

.event-bg-image {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    z-index: 0;
    object-fit: cover;
    object-position: center;
    filter:blur(10px) brightness(0.75);
}

h2 {
    font-weight: 700;
}

h3, p {
    font-weight: 300;
}

h2, h3, p {
    text-shadow: 0 0 5px black;
}

.custom-fs-6 {
    font-size: 1.025rem;
}

.attendee-block {
    height: 25dvh;
    overflow-y: scroll;
    background-color: var(--secondary);
}

.comment {
    background-color: var(--secondary);
}

</style>