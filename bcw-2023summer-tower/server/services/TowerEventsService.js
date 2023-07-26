import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class TowerEventsService {
    async getEvents() {
        const events = await dbContext.Events.find().populate('ticketCount')
        return events
    }
    async createEvent(body) {
        const event = await dbContext.Events.create(body)
        await event.populate('creator', 'name picture')
        await event.populate('ticketCount')
        return event
    }

    async getEventById(eventId) {
        const event = (await dbContext.Events.findById(eventId)).populate('ticketCount')
        if (!event)
            throw new BadRequest(`No event found with ID ${eventId}`)
        return event
    }

    async editEvent(eventId, editBody) {
        const event = await this.getEventById(eventId)
        event.name = editBody.name || event.name
        event.description = editBody.description || event.description
        event.coverImg = editBody.coverimg || event.coverImg
        event.location = editBody.location || event.location
        event.capacity = editBody.capacity || event.capacity
        event.startDate = editBody.startDate || event.startDate
        event.type = editBody.type || event.type
        await event.save()
        return event
    }

    async cancelEvent(eventId) {
        const event = await this.getEventById(eventId)
        await event.remove()
        return event
    }

}

export const towerEventsService = new TowerEventsService()