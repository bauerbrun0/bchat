import authenticatedTrpcMiddleware from "#/features/login/middleware/authenticated";
import serverInitializedMiddleware from "#/features/setup/middleware/initialized";
import serverUninitializedTrpcMiddleware from "#/features/setup/middleware/uninitialized";

import { t } from "./init";
import loggingMiddleware from "./middleware/logging";

export const baseProcedure = t.procedure.use(loggingMiddleware);
export const initializedServerProcedure = baseProcedure.use(serverInitializedMiddleware);
export const uninitializedServerProcedure = baseProcedure.use(serverUninitializedTrpcMiddleware);
export const authenticatedProcedure = initializedServerProcedure.use(authenticatedTrpcMiddleware);
