"use client";
import styles from './styles/CommentsSection.module.css';
import Post from './Post';
import Response from './Response.js';
import { useComments } from '../contexts/CommentsContext.js';

export default function CommentsSection() {
    const comments = useComments();
    const commentPosts = comments.map(comment => <Post key={comment.id} comment={comment} />);

    return (
       <section className={styles.commentsSection}>
           {commentPosts}
           <Response isResponse={false} />
       </section>
    );
}