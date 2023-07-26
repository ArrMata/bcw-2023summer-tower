import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .delete('/:eventId', this.cancelEvent)
            .put('/:eventId', this.editEvent)
            .post('', this.createEvent)
    }
    async getEvents(req, res, next) {
        try {
            const events = await towerEventsService.getEvents()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            eventData.creatorId = req.userInfo.id
            const event = await towerEventsService.createEvent(eventData)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const event = await towerEventsService.getEventById(req.params.eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            const event = await towerEventsService.editEvent(req.params.eventId, req.body)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

}