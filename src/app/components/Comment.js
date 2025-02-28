"use client";
import styles from './styles/Comment.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext.js';
import Response from './Response.js';
import DeleteModal from './DeleteModal.js';
import { useDispatch } from 'react-redux';
import { addReply, deleteComment, updateComment, incrementScore, decrementScore } from '../../../store/commentsSlice.js';

export default function Comment({ isReply, comment }) {  
    // Dispatch redux
    const dispatch = useDispatch();

    // CurrentUserContext
    const currentUser = useCurrentUser();
    const isCurrentUser = currentUser.username === comment.user.username;

    // State
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ replyVisible, setReplyVisible ] = useState(false);
    const [ commentEdited, setCommentEdited ] = useState(comment.content);   
    const [ isEditing, setIsEditing ] = useState(false); 

    function handleEdit() {
        setIsEditing(true);
    }

    function handleDelete() {
        setShowDeleteModal(true);
    }

    function handleReply() {
        setReplyVisible(true);
    }

    function addNewReply(newReply) { 
        if(newReply !== '') {
            dispatch(addReply({comment: comment, newReply: newReply, currentUser: currentUser}));
        }
        setReplyVisible(false); 
    }

    return (
    <>
        <div className={styles.comment}>
            {/* Reactions */}
            <div className={styles.comment__reactions}>
                <Image 
                    onClick={() => dispatch(incrementScore({isReply: isReply, comment: comment}))}
                    src='/images/icon-plus.svg'
                    alt='Plus'
                    width={12}
                    height={12}
                />
                <span>{comment.score}</span>
                <Image 
                    onClick={() => dispatch(decrementScore({isReply: isReply, comment: comment}))}
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

            {/* Form to update comment */}
            {(isCurrentUser && isEditing) &&
                (<form onSubmit={e => e.preventDefault()} className={styles.comment__form}>
                    <textarea 
                        onChange={(e) => setCommentEdited(e.target.value)}
                        type='text'
                        name='content'
                        value={commentEdited}
                    >   
                    </textarea>
                    <button onClick={() => {
                        dispatch(updateComment({isReply: isReply, comment: comment, commentEdited: commentEdited}))
                        setIsEditing(false);
                    }}>update</button>
                </form>)
            }
            
        </div>
        {replyVisible && <Response isResponse={true} addNewReply={addNewReply}/>}
        {showDeleteModal && <DeleteModal deleteComment={() => dispatch(deleteComment({isReply: isReply, comment: comment}))} setShowDeleteModal={setShowDeleteModal}/>}
    </>
    );
}