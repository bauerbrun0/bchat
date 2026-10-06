import { createStart } from "@tanstack/react-start";

import loggingMiddleware from "./middleware/logging";
import serverInitializedMiddleware from "./middleware/serverInitialized";

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [loggingMiddleware, serverInitializedMiddleware],
  };
});
