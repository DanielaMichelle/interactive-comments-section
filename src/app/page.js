"use client";
import styles from "./page.module.css";
import { useState } from "react";
import CommentData from "../../data.json";
import { CurrentUserProvider } from "./contexts/CurrentUserContext.js";
import CommentsSection from "./components/CommentsSection.js";
import Reply from "./components/Response.js";

export default function Home() {
  const [comments, setComments] = useState(CommentData.comments);

  return (
    <CurrentUserProvider>
      <main className={styles.main}>
        <CommentsSection comments={comments} setComments={setComments} />
      </main>
    </CurrentUserProvider>
  );
}
