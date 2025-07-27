import { adminClient, magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const authClient = createAuthClient({
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After");
        toast.error(`Limit exceeded. Retry after ${retryAfter} seconds`);
      }
    },
  },
  plugins: [magicLinkClient(), adminClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
