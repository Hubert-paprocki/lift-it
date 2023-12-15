import styles from "./page.module.scss";
import AppFeaturesList from "@/components/appFeaturesList/AppFeaturesList";
import LoginButtonBox from "@/components/loginButtonBox/LoginButtonBox";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <header className={styles.logo}>
          <div className={styles.logoWrapper}>
            <h1 className={styles.logoText}>Lift It.</h1>
            <div className={styles.logoBg}></div>
          </div>
        </header>
        <section></section>
      </div>
    </main>
  );
}
