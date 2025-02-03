import { ReactNode } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  size: "sm" | "md" | "lg";
  icon?: ReactNode;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const btnVariant =
    props.variant === "primary"
      ? "bg-[#5046E2] text-white"
      : "bg-[#DFE7FE] text-[#5046E2]";

  return (
    <>
      <button
        onClick={props.onClick}
        className={`${btnVariant} px-4 py-2 cursor-pointer rounded-md text-${props.size} flex items-center justify-center gap-2`}
      >
        {props.icon} {props.text}
      </button>
    </>
  );
};

export default Button;
