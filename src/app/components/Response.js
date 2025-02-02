import styles from './styles/Response.module.css';
import Image from 'next/image';
import { useCurrentUser } from '../contexts/CurrentUserContext.js';
import { useState } from 'react';

export default function Response({ comments, setComments, isResponse, addNewReply }) {
    const [newComment, setNewComment] = useState('');
    const currentUser = useCurrentUser();
    const [commentsLength, setCommentsLength] = useState(5);
    
    function addNewComment(e) {
        setComments(prevComments => [
            ...prevComments,
            {
                id: commentsLength + 1,
                content: newComment,
                createdAt: 'now',
                score: 0,
                user: currentUser,
                replies: []
            }
        ]);
        setCommentsLength(prevCommentsLength => prevCommentsLength + 1);
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
                >
                </textarea>
                {isResponse ? <button onClick={() => addNewReply(newComment)}>Reply</button> : <button onClick={addNewComment}>Send</button>}
            </form>
        </div>
    );
}