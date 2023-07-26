import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { towerSchema } from '../models/TowerEvent';
import { ticketSchema } from '../models/Ticket';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('Event', towerSchema)
  Tickets = mongoose.model('Ticket', ticketSchema)
}

export const dbContext = new DbContext()
