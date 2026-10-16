import { router } from "../init";
import serverInfoRouter from "./serverInfo";
import usersRouter from "./users";

export const trpcRouter = router({
  users: usersRouter,
  serverInfo: serverInfoRouter,
});

export type TRPCRouter = typeof trpcRouter;
