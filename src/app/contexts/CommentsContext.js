import { createContext, useContext, useReducer, useState } from "react";
import Data from '../../../data.json';

const CommentsContext = createContext(null);
const CommentsDispatchContext = createContext(null);
const CommentLengthContext = createContext(0);

export function CommentsProvider({ children }) {
    const [comments, dispatchComments] = useReducer(commentsReducer, Data.comments);
    const [commentsLength, setCommentsLength] = useState(5);

    return (
        <CommentsContext.Provider value={comments}>
            <CommentsDispatchContext.Provider value={dispatchComments}>
                <CommentLengthContext.Provider value={{ commentsLength, setCommentsLength }}>
                {children}
                </CommentLengthContext.Provider>
            </CommentsDispatchContext.Provider>
        </CommentsContext.Provider>
    )
}

export function useComments() {
    return useContext(CommentsContext);
}

export function useCommentsDispatch() {
    return useContext(CommentsDispatchContext);
}

export function useCommentsLength() {
    return useContext(CommentLengthContext);
}


function commentsReducer(comments, action) {
    switch (action.type) {
        case 'ADD_COMMENT': {
            return [
                ...comments,
                {
                    id: action.commentsLength + 1,
                    content: action.newComment,
                    createdAt: 'just now',
                    score: 0,
                    user: action.currentUser,
                    replies: []
                }
            ];
        }
        case 'ADD_REPLY': {
            return comments.map(comment => {
                return comment.id === action.comment.id ? 
                ({...comment, replies: 
                    [
                        ...comment.replies, 
                        {
                            id: action.commentsLength + 1,
                            content: action.newReply,
                            createdAt: 'just now',
                            score: 0,
                            replyingTo: action.comment.user.username,
                            user: action.currentUser,
                            replies: []
                        }
                    ]}) 
                : 
                comment
            })
        }
        case 'DELETE_COMMENT': {
            return !action.isReply ? 
            comments.filter(comment => comment.id !== action.comment.id)
            :
            comments.map(comment => {
                return ({
                    ...comment,
                    replies: comment.replies.filter(reply => reply.id !== action.comment.id)
                })
            })  
        }
        case 'UPDATE_COMMENT': {
            return !action.isReply ?
            comments.map(comment => {
                return ({
                    ...comment,
                    content: comment.id === action.comment.id ? action.commentEdited : comment.content
                })
            })
            :
            comments.map(comment => {
                return {
                    ...comment,
                    replies: comment.replies.map(reply => reply.id === action.comment.id ? ({...reply, content: action.commentEdited}) : reply)
                }
            })
        }
        case 'INCREMENT_SCORE': {
            return !action.isReply ?
            comments.map(comment => {
                return ({
                    ...comment,
                    score: comment.id === action.comment.id ? comment.score + 1 : comment.score
                })
            })
            :
            comments.map(comment => {
                return {
                    ...comment,
                    replies: comment.replies.map(reply => reply.id === action.comment.id ? ({...reply, score: reply.score + 1}) : reply)
                }
                
            })
        }
        case 'DECREMENT_SCORE': {
            return !action.isReply ?
            comments.map(comment => {
                return ({
                    ...comment,
                    score: comment.id === action.comment.id ? comment.score - 1 : comment.score
                })
            })
            :
            comments.map(comment => {
                return {
                    ...comment,
                    replies: comment.replies.map(reply => reply.id === action.comment.id ? ({...reply, score: reply.score - 1}) : reply)
                }
                
            })
        }
        default: {
            throw new Error(`Unknown action: ${action.type}`);
        }
    }
}