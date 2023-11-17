import React from "react";
import styles from "./Buttons.module.scss";

interface ButtonProps {
  readonly children?: React.ReactNode;
  readonly onClick?: () => void;
  readonly type?: "button" | "submit" | "reset" | undefined;
  readonly login?: boolean;
  readonly signUp?: boolean;
}

function Button(props: ButtonProps) {
  const { children, onClick, type, login, signUp } = props;
  let buttonClass;
  if (login) buttonClass = styles.login;
  else if (signUp) buttonClass = styles.signUp;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass ? buttonClass : ""}
    >
      {children}
    </button>
  );
}

export default Button;
