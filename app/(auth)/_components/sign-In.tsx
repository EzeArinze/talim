"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useState,
  // useTransition
} from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";
import { schema } from "@/utils/zod-shcemas/SignInSchema";
import z from "zod";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [loading, startTransition] = useTransition()

  const handleSignIn = async () => {
    try {
      const resolvedEmail = schema.parse({ email });
      await signIn.magicLink(
        {
          email: resolvedEmail.email,
        },
        {
          onRequest: () => {
            setSignInLoading(true);
          },
          onResponse: () => {
            setSignInLoading(false);
            toast.success("Check your email for the magic link!", {
              description: `We have sent a magic link to your email.`,
            });
          },
          onError: (error) => {
            setSignInLoading(false);
            toast.error("Error signing in:", {
              description: error.error.message,
            });
          },
        }
      );
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message || "Invalid email address");
      }
    }
  };

  const handleSignInWithProvider = async () => {
    await signIn.social(
      {
        provider: "google",
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onError: (error) => {
          setLoading(false);
          toast.error("Error signing in:", {
            description: error.error.message,
          });
        },
      }
    );
  };

  return (
    <Card className="max-w-md mx-auto gap-6">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl ">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm ">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {error && <p className="text-red-300 text-xs m-1">{error}</p>}
            <Button
              disabled={loading || signInLoading}
              className="gap-2"
              onClick={handleSignIn}
            >
              {signInLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                " Sign-in with Email"
              )}
            </Button>
          </div>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:z-0 after:top-1/2 after:flex after:w-full after:items-center after:border-t after:border-text-muted-foreground">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              Or continue
            </span>
          </div>
          <div
            className={cn(
              "w-full gap-2 flex items-center",
              "justify-between flex-col"
            )}
          >
            <Button
              variant="outline"
              className={cn("w-full gap-2")}
              disabled={loading || signInLoading}
              onClick={handleSignInWithProvider}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Image
                  src="/google.svg"
                  alt="Google Logo"
                  className="size-4"
                  width={4}
                  height={4}
                />
              )}{" "}
              Sign in with Google
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground text-center">
          By signing in, you agree to our{" "}
          <span className="hover:text-primary hover:underline">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="hover:text-primary hover:underline">
            Privacy Policy
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
