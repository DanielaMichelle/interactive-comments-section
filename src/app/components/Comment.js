"use client";
import styles from './styles/Comment.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function Comment({ isReply, comment, data, setData }) {
    const isCurrentUser = data.currentUser.username === comment.user.username;
    const [isEditing, setIsEditing] = useState(false);

    function plusScore() {
        setData(prevData => ({
            ...prevData,
            comments: prevData.comments.map(prevComment =>{
                return !isReply ? 
                (prevComment.id === comment.id ? {...prevComment, score: prevComment.score + 1} : prevComment)
                :
                ({
                    ...prevComment,
                    replies: prevComment.replies.map(reply => {
                        return reply.id === comment.id ? {...reply, score: reply.score + 1} : reply;
                    })
                })


            })
        }));
    }

    function minusScore() {
        setData(prevData => ({
            ...prevData,
            comments: prevData.comments.map(prevComment =>{
                return !isReply ? 
                (prevComment.id === comment.id && prevComment.score > 0 ? {...prevComment, score: prevComment.score - 1} : prevComment)
                :
                ({
                    ...prevComment,
                    replies: prevComment.replies.map(reply => {
                        return reply.id === comment.id && reply.score > 0 ? {...reply, score: reply.score - 1} : reply;
                    })
                })


            })
        }));
    }

    function handleChange(e) {
        setData(
            prevData => ({
                ...prevData,
                comments: prevData.comments.map(prevComment => {
                    if(prevComment.id === comment.id) {
                        return ({...prevComment, content: e.target.value})
                    } else {
                        return (prevComment)
                    }
                })
            })
        );
        console.log("data", data.comments);
    }

    function handleEdit() {
        setIsEditing(true);
    }

    return (
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
                {!isCurrentUser ? 
                    <button className={styles.reply}>
                        <Image 
                            src='/images/icon-reply.svg'
                            alt='Reply'
                            width={12}
                            height={12}
                        />
                        Reply
                    </button>:
                    <>
                        <button className={styles.delete}>
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
                    <input 
                        onChange={handleChange}
                        type='text'
                        name='content'
                        value={comment.content}
                    >   
                    </input>
                    <button>update</button>
                </form>)
            }
            
        </div>
    );
}