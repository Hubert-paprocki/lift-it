"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import ModalBox from "@/components/modalBox/ModalBox";
import Button from "@/components/ui/buttons/Buttons";
import styles from "./LoginButtonBox.module.scss";

function LoginButtonBox() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const switchModal = (content?: any) => {
    setModalContent(content);
    setShowModal(!showModal);
  };

  return (
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
  );
}

export default LoginButtonBox;
