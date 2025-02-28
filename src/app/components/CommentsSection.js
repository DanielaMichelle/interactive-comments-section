"use client";
import styles from './styles/CommentsSection.module.css';
import Post from './Post';
import Response from './Response.js';
import { useSelector } from "react-redux";

export default function CommentsSection() {
    const comments = useSelector(state => state.comments.value);
    const commentPosts = comments.map(comment => <Post key={comment.id} comment={comment} />);

    return (
       <section className={styles.commentsSection}>
           {commentPosts}
           <Response isResponse={false} />
       </section>
    );
}