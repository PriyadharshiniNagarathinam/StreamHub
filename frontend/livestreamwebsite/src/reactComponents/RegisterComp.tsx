import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogContent,
} from "../../components/ui/dialog";
import { useState } from "react";

export default function RegisterComp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [useremail, setUserEmail] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, useremail }),
      });

      if (response.ok) {
        window.confirm("Successfully registered! Please login to continue");
        setUserEmail("");
        setPassword("");
        setUsername("");
      } else {
        console.log("Error registering", response);
        alert("Error registering");
      }
    } catch (error) {
      console.log("Error registering", error);
      alert("Error registering");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Register</DialogTrigger>
      <DialogContent className="w-screen max-w-[500px]">
        <DialogDescription>
          <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Register</CardTitle>
              <CardDescription>Creat an Account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    required
                    type="email"
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={useremail}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="mohamed123"
                    required
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    required
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <Button
                  className="w-full"
                  type="submit"
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
