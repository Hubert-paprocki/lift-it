import React from "react";
import styles from "./ModalBox.module.scss";
import Button from "../ui/buttons/Buttons";
import LoginForm from "../form/Form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { FormValues } from "../form/Form";
interface ModalBoxProps {
  onClick: () => void;
  content: string;
}

function ModalBox(props: ModalBoxProps) {
  const handleSubmit = async (values: FormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.userEmail,
        values.password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage, values);
    }
  };

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
              onSubmit={handleSubmit}
            />
          )}
          {props.content === "signUp" && (
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
                {
                  name: "repeatPassword",
                  type: "text",
                  id: "repeatPassword",
                  initialValue: "",
                },
              ]}
              labelMsg={"welcome back"}
              btnText={"Sign Up"}
              onSubmit={handleSubmit}
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
