"use client";
import styles from './styles/CommentsSection.module.css';
import Post from './Post';
import { useState } from 'react';
import Response from './Response.js';

export default function CommentsSection({ comments, setComments }) {
    const commentPosts = comments.map(comment => <Post key={comment.id} comment={comment} comments={comments} setComments={setComments}/>);

    return (
       <section className={styles.commentsSection}>
           {commentPosts}
           <Response comments={comments} setComments={setComments} isResponse={false} />
       </section>
    );
}