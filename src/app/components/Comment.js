"use client";
import styles from './styles/Comment.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext.js';
import { useComments, useCommentsDispatch, useCommentsLength} from '../contexts/CommentsContext.js';
import Response from './Response.js';
import DeleteModal from './DeleteModal.js';

export default function Comment({ isReply, comment }) {
    // CommentsContext
    const comments = useComments();
    const dispatchComments = useCommentsDispatch(); 
    const { commentsLength, setCommentsLength } = useCommentsLength();

    // CurrentUserContext
    const currentUser = useCurrentUser();
    const isCurrentUser = currentUser.username === comment.user.username;

    // State
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ replyVisible, setReplyVisible ] = useState(false);
    const [ commentEdited, setCommentEdited ] = useState(comment.content);   
    const [ isEditing, setIsEditing ] = useState(false); 


    console.log(comments);
    
    function plusScore() {
        dispatchComments({
            type: 'INCREMENT_SCORE',
            comment: comment,
            isReply: isReply
        })
        // setComments(prevComments => {
        //     return !isReply ?
        //     prevComments.map(prevComment => {
        //         return ({
        //             ...prevComment,
        //             score: prevComment.id === comment.id ? prevComment.score + 1 : prevComment.score
        //         })
        //     })
        //     :
        //     prevComments.map(prevComment => {
        //         return {
        //             ...prevComment,
        //             replies: prevComment.replies.map(reply => reply.id === comment.id ? ({...reply, score: reply.score + 1}) : reply)
        //         }
                
        //     })
            
        // });
    }

    function minusScore() {
        dispatchComments({
            type: 'DECREMENT_SCORE',
            comment: comment,
            isReply: isReply
        })
        // setComments(prevComments => {
        //     return !isReply ?
        //     prevComments.map(prevComment => {
        //         return ({
        //             ...prevComment,
        //             score: prevComment.id === comment.id ? prevComment.score - 1 : prevComment.score
        //         })
        //     })
        //     :
        //     prevComments.map(prevComment => {
        //         return {
        //             ...prevComment,
        //             replies: prevComment.replies.map(reply => reply.id === comment.id ? ({...reply, score: reply.score - 1}) : reply)
        //         }
                
        //     })
            
        // });
    }

    function handleEdit() {
        setIsEditing(true);
    }

    function updateComment(e) {
        dispatchComments({
            type: 'UPDATE_COMMENT',
            comment: comment,
            isReply: isReply,
            commentEdited: commentEdited
        })
        // setComments(prevComments => {
        //     return !isReply ?
        //     prevComments.map(prevComment => {
        //         return ({
        //             ...prevComment,
        //             content: prevComment.id === comment.id ? commentEdited : prevComment.content
        //         })
        //     })
        //     :
        //     prevComments.map(prevComment => {
        //         return {
        //             ...prevComment,
        //             replies: prevComment.replies.map(reply => reply.id === comment.id ? ({...reply, content: commentEdited}) : reply)
        //         }
        //     })
        // });
        setIsEditing(false);
    }

    function handleDelete() {
        setShowDeleteModal(true);
    }

    function deleteComment() {
        dispatchComments({
            type: 'DELETE_COMMENT',
            comment: comment,
            isReply: isReply

        })
        // setComments(prevComments => {
        //     return !isReply ? 
        //     prevComments.filter(prevComment => prevComment.id !== comment.id)
        //     :
        //     prevComments.map(prevComment => {
        //         return ({
        //             ...prevComment,
        //             replies: prevComment.replies.filter(reply => reply.id !== comment.id)
        //         })
        //     })
        // });
    }

    function handleReply() {
        setReplyVisible(true);
    }

    function addNewReply(newReply) { 
        if(newReply !== '') {
            dispatchComments({
                type: 'ADD_REPLY',
                comment: comment,
                commentsLength: commentsLength,
                newReply: newReply,
                currentUser: currentUser
            })  
            setCommentsLength(prevCommentsLength => prevCommentsLength + 1);
        }
        // setComments(prevComments => {
        //     return prevComments.map(prevComment => {
        //         return prevComment.id === comment.id ? 
        //         ({...prevComment, replies: 
        //             [
        //                 ...prevComment.replies, 
        //                 {
        //                     id: commentsLength + 1,
        //                     content: newReply,
        //                     createdAt: 'now',
        //                     score: 0,
        //                     replyingTo: comment.user.username,
        //                     user: currentUser,
        //                     replies: []
        //                 }
        //             ]}) 
        //         : 
        //         prevComment
        //     })
        // })  
        setReplyVisible(false); 
    }

    return (
    <>
        <div className={styles.comment}>
            {/* Reactions */}
            <div className={styles.comment__reactions}>
                <Image 
                    onClick={plusScore}
                    src='/images/icon-plus.svg'
                    alt='Plus'
                    width={12}
                    height={12}
                />
                <span>{comment.score}</span>
                <Image 
                    onClick={minusScore}
                    src='/images/icon-minus.svg'
                    alt='Minus'
                    width={12}
                    height={4}
                />
            </div>

            {/* UserInfo */}
            <div className={styles.comment__userInfo}>
                <Image 
                    src={comment.user.image.webp.slice(1)}
                    alt={`Avatar de ${comment.user.username}`}
                    width={26}
                    height={26}
                />
                <span className={styles.username}>{comment.user.username}</span>
                {isCurrentUser && <span className={styles.you}>you</span>}
                <span className={styles.date}>{comment.createdAt}</span>
            </div>

            {/*  Buttons */}
            <div className={styles.comment__buttons}>
                {(!isCurrentUser && !isReply) &&
                    <button onClick={handleReply} className={styles.reply}>
                        <Image 
                            src='/images/icon-reply.svg'
                            alt='Reply'
                            width={12}
                            height={12}
                        />
                        Reply
                    </button>
                }
                {isCurrentUser &&
                    <>
                        <button onClick={handleDelete} className={styles.delete}>
                            <Image 
                                src='/images/icon-delete.svg'
                                alt='Edit'
                                width={12}
                                height={12}
                            />
                            Delete
                        </button>
                        <button onClick={handleEdit} className={styles.edit}>
                            <Image 
                                src='/images/icon-edit.svg'
                                alt='Edit'
                                width={12}
                                height={12}
                            />
                            Edit
                        </button>
                    </>
                }  
            </div>

            {/* Text */}
            {!isEditing &&
                (<div className={styles.comment__text}>
                    <p>
                        {isReply && <span>@{comment.replyingTo}</span>}
                        {comment.content}
                    </p>
                </div>)
            }

            {/* Form */}
            {(isCurrentUser && isEditing) &&
                (<form onSubmit={e => e.preventDefault()} className={styles.comment__form}>
                    <textarea 
                        onChange={(e) => setCommentEdited(e.target.value)}
                        type='text'
                        name='content'
                        value={commentEdited}
                    >   
                    </textarea>
                    <button onClick={updateComment}>update</button>
                </form>)
            }
            
        </div>
        {replyVisible && <Response isResponse={true} addNewReply={addNewReply}/>}
        {showDeleteModal && <DeleteModal deleteComment={deleteComment} setShowDeleteModal={setShowDeleteModal}/>}
    </>
    );
}