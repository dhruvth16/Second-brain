import { ReactNode } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary" | "tertiary";
  text: string;
  size: "sm" | "md" | "lg";
  icon?: ReactNode;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const btnVariant =
    props.variant === "primary"
      ? "bg-[#5046E2] text-white"
      : props.variant === "secondary"
      ? "bg-[#F1F2F6] text-[#5046E2]"
      : "bg-[#5046E2] text-white";

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        className={`${btnVariant} mt-2 px-4 py-2 cursor-pointer rounded-md text-${props.size} flex items-center justify-center gap-2`}
      >
        {props.icon} {props.text}
      </button>
    </>
  );
};

export default Button;
