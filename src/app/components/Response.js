import styles from './styles/Response.module.css';
import Image from 'next/image';
import { useCurrentUser } from '../contexts/CurrentUserContext.js';
import { useState } from 'react';
import { useComments, useCommentsDispatch, useCommentsLength } from '../contexts/CommentsContext'; 
import { Playwrite_CA } from 'next/font/google';

export default function Response({ isResponse, addNewReply }) {
    const dispatchComments = useCommentsDispatch();
    const [newComment, setNewComment] = useState('');
    const currentUser = useCurrentUser();
    const { commentsLength, setCommentsLength } = useCommentsLength(); 
    
    function addNewComment() {
        if(newComment !== '') {
            dispatchComments({
                type: 'ADD_COMMENT',
                commentsLength: commentsLength,
                newComment: newComment,
                currentUser: currentUser
            })
            setCommentsLength(prevCommentsLength => prevCommentsLength + 1);
            setNewComment('');
        }
    }

    return(
        <div className={isResponse ? `${styles.response} ${styles.response_comment}` : styles.response}>
            <Image 
                className={styles.response__avatar} 
                src={currentUser.image.webp.slice(1)} 
                alt={currentUser.username} 
                width={30} 
                height={30}
            ></Image>
            <form onSubmit={e => e.preventDefault()} className={styles.response__form}>
                <textarea 
                    type="text"
                    name='content'
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                    placeholder={!isResponse ? 'Add a comment...': ''}
                >
                </textarea>
                {isResponse ? <button onClick={() => addNewReply(newComment)}>Reply</button> : <button onClick={addNewComment}>Send</button>}
            </form>
        </div>
    );
}