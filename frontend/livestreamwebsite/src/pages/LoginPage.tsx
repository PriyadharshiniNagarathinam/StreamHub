import { cn } from "../../lib/utils";
import { Button, buttonVariants } from "../../components/ui/button";
import { UserAuthForm } from "../reactComponents/user-auth-comp";
import RegisterComp from "../reactComponents/RegisterComp";
import loginImg from "../assets/images/loginPageImage.jpg";

export default function LoginPage() {
  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <img
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button className={"absolute right-4 top-4 md:right-8 md:top-8"}>
          <RegisterComp />
        </Button>
        <div className="relative hidden h-full flex-col bg-muted p-10  lg:flex dark:border-r">
          <div className="relative z-20 flex items-center text-lg font-medium ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            StreamHub
          </div>
          <img src={loginImg} style={{ height: "70%", marginTop:"50px" }}></img>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Log in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to log in to your account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
