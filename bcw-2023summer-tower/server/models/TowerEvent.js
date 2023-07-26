import { Schema } from "mongoose";

export const towerSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, minLength: 3, maxLength: 75 },
    description: { type: String, maxLength: 1000 },
    coverImg: { type: String, maxLength: 300 },
    location: { type: String, required: true, maxLength: 200 },
    capacity: { type: Number, required: true, min: 1, max: 100000000 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

towerSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

towerSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    count: true,
    ref: 'Ticket'
})