import styles from './styles/Response.module.css';
import Image from 'next/image';
import { useCurrentUser } from '../contexts/CurrentUserContext.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../store/commentsSlice';

export default function Response({ isResponse, addNewReply }) {
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState('');
    const currentUser = useCurrentUser();
    
    function addNewComment() {
        if(newComment !== '') {
            dispatch(addComment({newComment: newComment, currentUser: currentUser}));
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