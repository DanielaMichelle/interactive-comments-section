import styles from './styles/Post.module.css';
import Comment from './Comment.js';


export default function Post({ comment, data, setData }) {    
    const commentReplies = comment.replies.map(reply => <Comment key={reply.id} isReply={true} comment={reply} data={data} setData={setData}/>);
    
    return (
        <div className={styles.commentPost}>
            <Comment key={comment.id} isReply={false} comment={comment} data={data} setData={setData}/>
            {comment.replies.length > 0 && <div className={styles.commentPost__replies}>{commentReplies}</div>}
        </div>
    );
}