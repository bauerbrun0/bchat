import { t } from "./init";
import loggingMiddleware from "./middleware/logging";
import serverInitializedMiddleware from "./middleware/serverInitialized";
import serverUninitializedTrpcMiddleware from "./middleware/serverUninitialized";

export const baseProcedure = t.procedure.use(loggingMiddleware);
export const initializedServerProcedure = baseProcedure.use(serverInitializedMiddleware);
export const uninitializedServerProcedure = baseProcedure.use(serverUninitializedTrpcMiddleware);
