"use client";
import styles from './styles/CommentsSection.module.css';
import Post from './Post';
import Data from '../../../public/data.json';
import { useState } from 'react';

export default function CommentsSection() {
    const [data, setData] = useState(Data);
    
    const commentPosts = data.comments.map(comment => <Post key={comment.id} comment={comment} data={data} setData={setData}/>);
    
    return (
       <section className={styles.commentsSection}>
           {commentPosts}
       </section>
    );
}