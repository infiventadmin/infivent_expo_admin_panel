"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";
import supabase from "@/supabase/config";

export function Login({ className, ...props }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    let { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("user_id", formData.email)
      .eq("password", formData.password)
      .single();

    // Check login credentials here
    // console.log("user", user);
    if (!user) {
      toast.error("Please check your password and user ID.!");
    }
    if (user != null) {
      if (
        formData.email == user.user_id &&
        formData.password == user.password
      ) {
        sessionStorage.setItem("User_id", user.id);
        toast.success("Login successful!");
        router.push("/home");
      } else {
        toast.error("Wrong Email or Password");
      }
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
        <Toaster />
      </form>
    </div>
  );
}
