import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export const useClientSession = () => {
  const { data: session, isPending } = useSession();

  const initials =
    session?.user.email?.split("@")[0]?.slice(0, 1).toUpperCase() || "K";

  const email = session?.user.email || "@example.com";
  const picture = session?.user.image || `https://avatar.vercel.sh/${email}`;
  const name = session?.user.name || "johndoe";
  // Fallback for when session is pending
  // if (isPending && !session) {
  //   return {
  //     session: null,
  //     isPending: true,
  //     initials: "K",
  //     picture: `https://avatar.vercel.sh/${email}`,
  //     name: "johndoe",
  //     email,
  //   };
  // }

  return { session, isPending, initials, picture, name, email };
};

export const handleSignOut = async () => {
  await signOut({
    fetchOptions: {
      onSuccess: () => {
        toast.success("Successfully signed out");
        window.location.href = "/";
      },
      onError: () => {
        toast.error("failed to signOut");
      },
    },
  });
};
