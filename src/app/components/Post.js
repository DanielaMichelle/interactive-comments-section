"use client";
import styles from './styles/Post.module.css';
import Comment from './Comment.js';
import { useState } from 'react';
import Response from './Response.js';


export default function Post({ comment, comments, setComments}) {   
    const commentReplies = comment.replies.map(reply => <Comment key={reply.id} isReply={true} comment={reply} comments={comments} setComments={setComments} />);
    
    return (
        <div className={styles.commentPost}>
            <Comment key={comment.id} isReply={false} comment={comment} comments={comments} setComments={setComments} />
            {comment.replies.length > 0 && <div className={styles.commentPost__replies}>{commentReplies}</div>}
        </div>
    );
}