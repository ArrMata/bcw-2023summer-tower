import { Account } from "./Account"
import { TowerEvent } from "./TowerEvent"

export class Ticket {
    constructor(data) {
        this.id = data.id
        this.eventId = data.eventId
        this.accountId = data.accountId
        this.profile = data.profile ? new Account(data.profile) : null
        this.event = data.event ? new TowerEvent(data.event) : null
    }
}