import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TowerEventsService {

    async getTowerEvents() {
        try {
            const res = await api.get('api/events')
            AppState.towerEvents = res.data.map(e => new TowerEvent(e))
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }

    async getTowerEventById(eventId) {
        try {
            const res = await api.get(`api/events/${eventId}`)
            AppState.activeTowerEvent = new TowerEvent(res.data)
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }

    async cancelEvent(eventId) {
        try {
            const res = await api.delete(`api/events/${eventId}`)
            AppState.activeTowerEvent = new TowerEvent(res.data)
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }

    async createEvent(eventBody) {
        try {
            eventBody.startDate = new Date(`${eventBody.date} ${eventBody.time}`)
            const res = await api.post('api/events', eventBody)
            return new TowerEvent(res.data)
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }

    async getAccountEvents() {
        try {
            const res = await api.get('api/events')
            const filteredEvents = res.data.map(te => new TowerEvent(te)).filter(te => te.creatorId == AppState.account.id)
            AppState.towerEvents = filteredEvents
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }
}

export const towerEventsService = new TowerEventsService()