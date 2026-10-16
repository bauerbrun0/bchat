import { serverSetupRouter } from "#/features/setup/router";
import { usersRouter } from "#/features/users/router";

import { router } from "./init";

export const trpcRouter = router({
  users: usersRouter,
  serverSetup: serverSetupRouter,
});

export type TRPCRouter = typeof trpcRouter;
