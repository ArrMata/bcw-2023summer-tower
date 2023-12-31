import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { towerSchema } from '../models/TowerEvent';
import { ticketSchema } from '../models/Ticket';
import { commentSchema } from '../models/Comment';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('Event', towerSchema)
  Tickets = mongoose.model('Ticket', ticketSchema)
  Comments = mongoose.model('Comment', commentSchema)
}

export const dbContext = new DbContext()
