import { t } from "./init";

export type CustomTRPCClientError = ReturnType<typeof t._config.errorFormatter>;

type CustomTRPCClientValidationErrorData = Omit<CustomTRPCClientError["data"], "zodError"> & {
  zodError: NonNullable<CustomTRPCClientError["data"]["zodError"]>;
};

export type CustomTRPCClientValidationError = Omit<CustomTRPCClientError, "data"> & {
  data: CustomTRPCClientValidationErrorData;
};
