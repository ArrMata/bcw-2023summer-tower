import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TicketsService {
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        return ticket
    }

    async getUserAccountTickets(uid) {
        const tickets = await dbContext.Tickets.find({ accountId: uid }).populate('event')
        return tickets
    }

    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
        return tickets
    }

    async deleteTicket(ticketId, uid) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (ticket.accountId.toString() != uid)
            throw new Forbidden('You cannot delete a ticket that is not yours.')
        await ticket.remove()
        return ticket
    }
}

export const ticketsService = new TicketsService()