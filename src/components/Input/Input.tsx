import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { AuthSchema } from "../AuthSchema";

interface InputProps {
  name: keyof AuthSchema;
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<AuthSchema>;
  errors: FieldErrors<AuthSchema>;
}
const Input: React.FC<InputProps> = ({
  name,
  label,
  id,
  type,
  required,
  register,
  errors,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 outline-0"
        id={id}
        type={type}
        {...register(name)}
      />
      {errors && errors.email?.message}
    </div>
  );
};

export default Input;
