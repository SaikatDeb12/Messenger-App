import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  password: string;
}

type Variant = "LOGIN" | "REGISTER";
const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleVariant = useCallback(() => {
    if (variant == "LOGIN") setVariant("REGISTER");
    else setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <div className="">
      <h1>Auth form</h1>
    </div>
  );
};

export default AuthForm;
