import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

import loggingMiddleware from "./middleware/logging";

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [loggingMiddleware, csrfMiddleware],
  };
});
