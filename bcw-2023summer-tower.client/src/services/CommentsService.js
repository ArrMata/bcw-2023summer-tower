import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class CommentsService {

    async getCommentsByEventId(eventId) {
        try {
            const res = await api.get(`api/events/${eventId}/comments`)
            AppState.comments = res.data.map(c => new Comment(c))
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }

    async createComment(commentBody, eventId) {
        try {
            const res = await api.post('api/comments', { body: commentBody, eventId })
            AppState.comments.push(new Comment(res.data))
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }

    async deleteComment(commentId) {
        try {
            await api.delete(`api/comments/${commentId}`)
            AppState.comments = AppState.comments.filter(c => c.id != commentId)
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }
}

export const commentsService = new CommentsService()