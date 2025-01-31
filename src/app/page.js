import styles from "./page.module.css";
import CommentsSection from "./components/CommentsSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <CommentsSection />
    </main>
  );
}
