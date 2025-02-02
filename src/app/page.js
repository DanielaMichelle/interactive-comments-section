"use client";
import styles from "./page.module.css";
import { useState, useRef } from "react";
import CommentData from "../../data.json";
import { CurrentUserProvider } from "./contexts/CurrentUserContext.js";
import { CommentsProvider } from "./contexts/CommentsContext.js";
import CommentsSection from "./components/CommentsSection.js";
import DeleteModal from "./components/DeleteModal";

export default function Home() { 
  
  return (
    <CurrentUserProvider>
      <CommentsProvider>
        <main className={styles.main}>
          <CommentsSection />
          {/* <DeleteModal /> */}
        </main>
      </CommentsProvider>
    </CurrentUserProvider>
  );
}
