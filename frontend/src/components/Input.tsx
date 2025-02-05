import { inputVariants } from "../pages/LoginPage";

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  type: string;
  placeholder?: string;
}

export const Input = (props: InputProps) => {
  return (
    <>
      <input
        required={true}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        type={props.type}
        placeholder={props.placeholder}
        className={inputVariants}
      />
    </>
  );
};
