import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class CommentService {
    async createComment(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment
    }

    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
        return comments
    }

    async deleteComment(commentId, uid) {
        const comment = await dbContext.Comments.findById(commentId)
        if (comment.creatorId.toString() != uid)
            throw new Forbidden('You cannot delete a comment that is not yours.')
        await comment.remove()
        return comment
    }
}

export const commentsService = new CommentService()