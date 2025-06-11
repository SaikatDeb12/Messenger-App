import AuthForm from "./components/AuthForm";

const Index = () => {
  return (
    <div className="flex min-h-full h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="h-10 mx-auto w-auto"
          src="/images/logo.png"
          alt="logo"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default Index;
