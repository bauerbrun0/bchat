import { userManagementRouter } from "#/features/settings/admin/user-management/router";
import { serverSetupRouter } from "#/features/setup/router";

import { router } from "./init";

export const trpcRouter = router({
  serverSetup: serverSetupRouter,
  admin: {
    userManagement: userManagementRouter,
  },
});

export type TRPCRouter = typeof trpcRouter;
