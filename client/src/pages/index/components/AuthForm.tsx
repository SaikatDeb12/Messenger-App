import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthSchema } from "./AuthSchema";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axiosIns from "../../../libs/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const socialAction = (action: string) => {
    setIsLoading(true);
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/${action}`;
  };

  const onSubmit = async (data: AuthSchema) => {
    console.log("data submitted: ", data);
    setIsLoading(true);
    if (variant == "REGISTER") {
      console.log("Data: ", data);
      try {
        const res = await axiosIns.post("/api/auth/register", {
          name: data.name,
          email: data.email,
          password: data.password,
        });
        toast.success(res.data.msg);
        localStorage.setItem("token", res.data.token);
        navigate("/login");
      } catch (error) {
        console.error("REGISTER", error);
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    } else if (variant == "LOGIN") {
      try {
        const res = await axiosIns.post("/api/auth/login", {
          email: data.email,
          password: data.password,
        });
        toast.success(res.data.msg);
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } catch (error) {
        console.error("LOGIN", error);
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-full">
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
              disabled={isLoading}
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
            disabled={isLoading}
          />
          <Input
            label="Password"
            name="password"
            id="password"
            type="password"
            register={register}
            errors={errors}
            required={true}
            disabled={isLoading}
          />
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              fullWidth={true}
              children={variant == "LOGIN" ? "Sign In" : "Sign Up"}
              disabled={isLoading}
              secondary={false}
              danger={false}
            />
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            {
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => socialAction("github")}
              />
            }
            {
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialAction("google")}
              />
            }
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant == "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div className="underline cursor-pointer" onClick={toggleVariant}>
            {variant == "LOGIN" ? "Create an Account" : "Sign In"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
