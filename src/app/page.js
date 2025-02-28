"use client";
import styles from "./page.module.css";
import { CurrentUserProvider } from "./contexts/CurrentUserContext.js";
import CommentsSection from "./components/CommentsSection.js";

export default function Home() { 
  return (
    <CurrentUserProvider>
        <main className={styles.main}>
          <CommentsSection />
        </main>
    </CurrentUserProvider>
  );
}
