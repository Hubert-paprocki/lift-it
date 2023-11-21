import React from "react";
import styles from "./ModalBox.module.scss";
import Button from "../ui/buttons/Buttons";

interface ModalBoxProps {
  onClick: () => void;
  content: string;
}

function ModalBox(props: ModalBoxProps) {
  return (
    <div className={styles.modalBox}>
      <div className={styles.modalBoxSideBox}>
        {props.content === "login" && <div className=""></div>}
        {props.content === "signUp" && <div className=""></div>}
        <Button secondary onClick={props.onClick}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default ModalBox;
