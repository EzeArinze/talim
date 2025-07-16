import { useSession } from "@/lib/auth-client";

export const useClientSession = () => {
  const { data: session, isPending } = useSession();

  const initials =
    session?.user.email?.split("@")[0]?.slice(0, 1).toUpperCase() || "K";

  const email = session?.user.email || "@example.com";
  const picture = session?.user.image || `https://avatar.vercel.sh/${email}`;
  const name = session?.user.name || "johndoe";

  return { session, isPending, initials, picture, name, email };
};

// session?.user.name
//     ? session.user.name
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .toUpperCase()
//     :
