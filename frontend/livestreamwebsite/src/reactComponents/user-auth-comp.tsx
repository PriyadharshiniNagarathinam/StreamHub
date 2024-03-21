"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Icons } from "../../components/ui/icons";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [password, setPassword] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ useremail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const username = data.username;
        console.log("user is", username);
        const token = true;
        login(token,username);
        console.log("Login successful");
        setUserEmail("");
        setPassword("");
        navigate("/home");
      } else {
        // Login failed
        const message = await response.json();
        console.log(message);
        alert("User not found or password incorrect. Please try again.");
        setUserEmail("");
        setPassword("");
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

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
              disabled={isLoading}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              value={useremail}
            />
          </div>
          <div className="space-y-2">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              required
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
