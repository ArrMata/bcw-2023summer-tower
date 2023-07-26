import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TicketsService {
    async getTicketsByEventId(eventId) {
        try {
            const res = await api.get(`api/events/${eventId}/tickets`)
            AppState.tickets = res.data.map(t => new Ticket(t))
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }

    async createTicket(eventId) {
        try {
            const res = await api.post(`api/tickets`, { eventId })
            AppState.tickets.push(new Ticket(res.data))
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }

    async deleteTicket() {
        try {
            const ticket = AppState.tickets.find(ticketData => ticketData.accountId == AppState.account.id)
            await api.delete(`api/tickets/${ticket.id}`)
            AppState.tickets = AppState.tickets.filter(appTicket => appTicket.id != ticket.id)
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }

    async getAccountTickets() {
        try {
            const res = await api.get('account/tickets')
            AppState.tickets = res.data.map(t => new Ticket(t))
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }

    clearTickets() {
        AppState.tickets = []
    }
}

export const ticketsService = new TicketsService()