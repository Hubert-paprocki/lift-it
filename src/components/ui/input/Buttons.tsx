import React from "react";
import styles from "./Inputs.module.scss";
import Link from "next/link";

interface ButtonProps {
  readonly children?: React.ReactNode;
  readonly onClick?: () => void;
  readonly type?: "button" | "submit" | "reset" | undefined;
  readonly secondary?: boolean;
  readonly primary?: boolean;
  readonly link?: boolean;
  readonly href?: string;
}

function Button(props: ButtonProps) {
  const { children, onClick, type, secondary, primary, link, href } = props;
  let buttonClass;
  if (secondary) buttonClass = styles.secondary;
  else if (primary) buttonClass = styles.primary;

  return link ? (
    <Link href={href || ""} className={buttonClass ? buttonClass : ""}>
      {children}
    </Link>
  ) : (
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
