import { Schema } from "mongoose";

export const commentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true },
    eventId: { type: Schema.Types.ObjectId, required: true },
    body: { type: String, minLength: 5, maxLength: 500 },
    isAttending: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true } })

commentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})