import styles from './styles/DeleteModal.module.css';

export default function DeleteModal({ deleteComment, setShowDeleteModal }) {
    return (
        <div className={styles.deleteModal__background}>
            <div className={styles.deleteModal}>
                <h2>Delete comment</h2>
                <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
                <div className={styles.deleteModal__buttons}>
                    <button onClick={() => setShowDeleteModal(false)} className={styles.cancelBtn}>No, cancel</button>
                    <button onClick={deleteComment} className={styles.deleteBtn}>yes, delete</button>
                </div>
            </div>
        </div>
    )
}