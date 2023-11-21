import React from "react";
import styles from "./ModalBox.module.scss";
import Button from "../ui/buttons/Buttons";
import LoginForm from "../form/Form";

interface ModalBoxProps {
  onClick: () => void;
  content: string;
}

function ModalBox(props: ModalBoxProps) {
  return (
    <div className={styles.modalBox}>
      <div className={styles.modalBoxSideBox}>
        <div className={styles.modalBoxSideBoxInnerWrapper}>
          {props.content === "login" && (
            <LoginForm
              inputs={[
                {
                  name: "userEmail",
                  type: "email",
                  id: "userEmail",
                  initialValue: "",
                },
                {
                  name: "password",
                  type: "text",
                  id: "password",
                  initialValue: "",
                },
              ]}
              labelMsg={"welcome back"}
              btnText={"Log In"}
            />
          )}
          {props.content === "signUp" && (
            <LoginForm
              inputs={[
                {
                  name: "user Email",
                  type: "email",
                  id: "userEmail",
                  initialValue: "",
                },
                {
                  name: "password",
                  type: "text",
                  id: "password",
                  initialValue: "",
                },
                {
                  name: "repeat Password",
                  type: "text",
                  id: "repeatPassword",
                  initialValue: "",
                },
              ]}
              labelMsg={"welcome back"}
              btnText={"Sign Up"}
            />
          )}
        </div>
        <Button secondary onClick={props.onClick}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default ModalBox;
