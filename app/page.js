import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Login } from "@/components/Login";

const Page = () => {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/expo.jpg"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/expo.jpg"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
        <Login />
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 ">
        {/* <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link> */}
        <div className=" h-full overflow-hidden">
          <Image
            src="/signup.jpg"
            width={1000}
            height={1000}
            alt="Authentication"
            className="block dark:hidden"
          />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className=" flex justify-center items-center flex-col gap-1">
              {/* <Image src={"/RWE.png"} width={200} height={200} alt="Logo" /> */}
              <Image
                src={"/eventlogo.webp"}
                width={150}
                height={150}
                alt="Logo"
              />
            </div>

            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                {/* Enter your email below to create your account */}
              </p>
            </div>
            <Login />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
