import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { AuthSchema } from "../pages/authentication/components/AuthSchema";
import clsx from "clsx";
import "./input.css";

interface InputProps {
  name: keyof AuthSchema;
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<AuthSchema>;
  errors: FieldErrors<AuthSchema>;
  disabled?: boolean;
}
const Input: React.FC<InputProps> = ({
  name,
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div className="mt-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        className={clsx(
          `form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 outline-0 p-2`,
          errors[name] && "ring-rose-500 focus:ring-rose-500",
          disabled && "opacity-50 cursor-default"
        )}
        id={id}
        type={type}
        {...register(name)}
        autoComplete={id}
        disabled={disabled}
      />
      {errors[name]?.message && (
        <p className="mt-1 text-sm text-red-500">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default Input;
