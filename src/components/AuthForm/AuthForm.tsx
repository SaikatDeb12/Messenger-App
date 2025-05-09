import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./authform.css";
import { authSchema, type AuthSchema } from "../AuthSchema";
import Input from "../Input/Input";
import Button from "../Button/Button";

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
  } = useForm<AuthSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(authSchema),
  });

  const onSubmit = (data: AuthSchema) => {
    console.log(data);
    setIsLoading(true);
    if (variant == "REGISTER") {
      //
    } else if (variant == "LOGIN") {
      //
    }
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-full ">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 m-auto w-100">
        <form
          className="space-y-6 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant == "REGISTER" && (
            <Input
              name="name"
              label="Name"
              id="name"
              register={register}
              errors={errors}
              required={true}
            />
          )}
          <Input
            name="email"
            label="Email"
            id="email"
            type="email"
            register={register}
            errors={errors}
            required={true}
          />
          <Input
            label="Password"
            name="password"
            id="password"
            type="password"
            register={register}
            errors={errors}
            required={true}
          />
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              fullWidth={false}
              children={"Submit"}
              secondary={false}
              danger={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
