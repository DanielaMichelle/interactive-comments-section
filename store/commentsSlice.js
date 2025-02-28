import { createSlice } from "@reduxjs/toolkit";
import Data from "../data.json";

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        value: Data.comments,
        commentsLength: 5
    },
    reducers: {
        addComment: (state, action) => {
            const { newComment, currentUser } = action.payload;            
            state.value.push({id: state.commentsLength + 1, content: newComment, createdAt: 'just now', score: 0, user: currentUser, replies: []});
            state.commentsLength = state.commentsLength + 1;
        },
        addReply: (state, action) => {
            const { comment, newReply, currentUser } = action.payload;
            const commentSelected = state.value.find(c => c.id === comment.id);
            commentSelected.replies.push({id: state.commentsLength + 1, content: newReply, createdAt: 'just now', score: 0, replyingTo: comment.user.username, user: currentUser, replies: []})
            state.commentsLength = state.commentsLength + 1;
        },
        deleteComment: (state, action) => {
            const { isReply, comment } = action.payload;
            if(!isReply) {
                state.value = state.value.filter(c => c.id !== comment.id);
            } else {
                state.value = state.value.map( c => {
                    c.replies = c.replies.filter(reply => reply.id !== comment.id);
                    return c
                });
            }
        },
        updateComment: (state, action) => {
            const { isReply, comment, commentEdited } = action.payload;
            if(!isReply) {
                const commentSelected  = state.value.find(c => c.id === comment.id);
                commentSelected.content = commentEdited;
            } else {
                state.value = state.value.map( c => {
                    const replySelected = c.replies.find(reply => reply.id === comment.id)
                    if(replySelected) replySelected.content = commentEdited;
                    return c;
                });
            }
        },
        incrementScore: (state, action) => {
            const { isReply, comment } = action.payload;
            if(!isReply) {
                const commentSelected = state.value.find(c => c.id === comment.id);
                commentSelected.score = commentSelected.score + 1;
            } else {
                state.value = state.value.map( c => {
                    const replySelected = c.replies.find(reply => reply.id === comment.id);
                    if(replySelected) replySelected.score = replySelected.score + 1;
                    console.log('replySelected', replySelected);
                    return c;
                });                
            }
        },
        decrementScore: (state, action) => {
            const { isReply, comment } = action.payload;
            if(!isReply) {
                const commentSelected = state.value.find(c => c.id === comment.id);
                commentSelected.score = commentSelected.score - 1;
            } else {
                state.value = state.value.map( c => {
                    const replySelected = c.replies.find(reply => reply.id === comment.id)
                    if(replySelected && replySelected.score > 0) replySelected.score = replySelected.score - 1;
                    return c;
                });                
            }
        }
    }
})

export const { addComment, addReply, deleteComment, updateComment, incrementScore, decrementScore } = commentsSlice.actions;