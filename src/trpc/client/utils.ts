import { TRPCClientError } from "@trpc/client";

import type { CustomTRPCClientValidationError } from "../server/types";

export function isCustomTRPCClientValidationError(
  error: unknown,
): error is CustomTRPCClientValidationError {
  if (!(error instanceof TRPCClientError)) {
    return false;
  }

  return (
    error.data.code === "BAD_REQUEST" && "zodError" in error.data && error.data.zodError !== null
  );
}
