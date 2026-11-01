import { adminClient, usernameClient } from "better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from ".";

export const authClient = createAuthClient({
  plugins: [usernameClient(), adminClient(), inferAdditionalFields<typeof auth>()],
});
