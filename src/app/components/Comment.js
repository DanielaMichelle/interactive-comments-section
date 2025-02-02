"use client";
import styles from './styles/Comment.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext.js';
import Response from './Response.js';

export default function Comment({ isReply, comment, comments, setComments }) {

    const [replyVisible, setReplyVisible] = useState(false);
    const [commentEdited, setCommentEdited] = useState(comment.content);   
    const [isEditing, setIsEditing] = useState(false); 
    const [newReply, setNewReply] = useState('');
    const currentUser = useCurrentUser();
    const isCurrentUser = currentUser.username === comment.user.username;

    console.log(comments);
    
    function plusScore() {
        setComments(prevComments => {
            return !isReply ?
            prevComments.map(prevComment => {
                return ({
                    ...prevComment,
                    score: prevComment.id === comment.id ? prevComment.score + 1 : prevComment.score
                })
            })
            :
            prevComments.map(prevComment => {
                return {
                    ...prevComment,
                    replies: prevComment.replies.map(reply => reply.id === comment.id ? ({...reply, score: reply.score + 1}) : reply)
                }
                
            })
            
        });
    }

    function minusScore() {
        setComments(prevComments => {
            return !isReply ?
            prevComments.map(prevComment => {
                return ({
                    ...prevComment,
                    score: prevComment.id === comment.id ? prevComment.score - 1 : prevComment.score
                })
            })
            :
            prevComments.map(prevComment => {
                return {
                    ...prevComment,
                    replies: prevComment.replies.map(reply => reply.id === comment.id ? ({...reply, score: reply.score - 1}) : reply)
                }
                
            })
            
        });
    }

    function handleEdit() {
        setIsEditing(true);
    }

    function updateComment(e) {
        setComments(prevComments => {
            return !isReply ?
            prevComments.map(prevComment => {
                return ({
                    ...prevComment,
                    content: prevComment.id === comment.id ? commentEdited : prevComment.content
                })
            })
            :
            prevComments.map(prevComment => {
                return {
                    ...prevComment,
                    replies: prevComment.replies.map(reply => reply.id === comment.id ? ({...reply, content: commentEdited}) : reply)
                }
            })
        });
        setIsEditing(false);
    }

    function handleDelete() {
        setComments(prevComments => {
            return !isReply ? 
            prevComments.filter(prevComment => prevComment.id !== comment.id)
            :
            prevComments.map(prevComment => {
                return ({
                    ...prevComment,
                    replies: prevComment.replies.filter(reply => reply.id !== comment.id)
                })
            })
        });
    }

    function handleReply() {
        setReplyVisible(true);
    }

    function addNewReply(newReply) {   
        setComments(prevComments => {
            return prevComments.map(prevComment => {
                return prevComment.id === comment.id ? 
                ({...prevComment, replies: 
                    [
                        ...prevComment.replies, 
                        {
                            id: 9,
                            content: newReply,
                            createdAt: 'now',
                            score: 0,
                            replyingTo: comment.user.username,
                            user: currentUser,
                            replies: []
                        }
                    ]}) 
                : 
                prevComment
            })
        })  
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
        {replyVisible && <Response comments={comments} setComments={setComments} isResponse={true} addNewReply={addNewReply}/>}
    </>
    );
}