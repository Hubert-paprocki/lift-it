"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "./page.module.scss";
import Button from "@/components/ui/buttons/Buttons";
import AppFeaturesList from "@/components/appFeaturesList/AppFeaturesList";
import ModalBox from "@/components/modalBox/ModalBox";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const switchModal = (content?: any) => {
    setModalContent(content);
    setShowModal(!showModal);
  };

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <header className={styles.logo}>
          <div className={styles.logoWrapper}>
            <h1 className={styles.logoText}>Lift It.</h1>
            <div className={styles.logoBg}></div>
          </div>
        </header>
        <section className={styles.login}>
          <h2 className={styles.loginText}>
            Embark on your fitness journey
            <br /> – create your account now!
          </h2>
          <div className={styles.loginButtonBox}>
            <Button onClick={() => switchModal("login")} secondary>
              Login
            </Button>
            <Button onClick={() => switchModal("signUp")} primary>
              Sign Up
            </Button>
            {showModal &&
              createPortal(
                <ModalBox content={modalContent} onClick={switchModal} />,
                document.body
              )}
          </div>
        </section>
        <section className={styles.appFeaturesSection}>
          <h3 className={styles.appFeaturesSectionText}>App features</h3>
          <AppFeaturesList />
        </section>
      </div>
    </main>
  );
}
