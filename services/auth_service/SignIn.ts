import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export const useSignIn = async (email: string) => {
  await signIn.magicLink(
    {
      email,
    },
    {
      onSuccess: (ctx) => {
        toast.success("Check your email for the magic link!", {
          description: `We have sent a magic link to ${ctx.data?.user.email}.`,
        });
      },
      onError: (error) => {
        toast.error("Error signing in:", {
          description: error.error.message,
        });
      },
    }
  );
};

export const useSignInWithProvider = async () => {
  await signIn.social(
    {
      provider: "google",
      callbackURL: "/",
    },
    {
      onRequest: () => {},
      onResponse: () => {},
      onError: (error) => {
        toast.error("Error signing in:", {
          description: error.error.message,
        });
      },
    }
  );
};
