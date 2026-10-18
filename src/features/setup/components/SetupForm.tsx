import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import type { CustomTRPCClientValidationError } from "#/lib/trpc/server/types";

import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { toast } from "#/components/ui/toast";
import { useTRPC } from "#/lib/trpc/client/react";
import { isCustomTRPCClientValidationError } from "#/lib/trpc/client/utils";

export default function SetupForm() {
  const trpc = useTRPC();
  const createAdminMutation = useMutation(
    trpc.serverSetup.createInitialAdminUser.mutationOptions(),
  );

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState<
    CustomTRPCClientValidationError["data"]["zodError"]["fieldErrors"]
  >({});

  async function onSubmit() {
    try {
      await createAdminMutation.mutateAsync({
        username,
        password,
        confirmPassword,
      });
      navigate({ to: "/login" });
      toast.add({
        type: "success",
        title: "Server setup successful.",
        description: "Successfully created the admin user.",
      });
    } catch (error: unknown) {
      if (isCustomTRPCClientValidationError(error)) {
        setFieldErrors(error.data.zodError.fieldErrors);
        return;
      }

      setFieldErrors({});

      const description =
        error instanceof Error ? error.message : "An error occurred while creating the admin user.";
      toast.add({
        type: "error",
        title: "Something went wrong",
        description: description,
      });
    }
  }

  return (
    <Card className="h-fit w-full max-w-md">
      <CardHeader>
        <CardTitle>Server setup</CardTitle>
        <CardDescription>Create an admin user to initialize the server.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmit();
          }}
          id="setupForm"
        >
          <FieldGroup>
            <Field data-invalid={"username" in fieldErrors}>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                aria-invalid={"username" in fieldErrors}
              />
              {"username" in fieldErrors && (
                <FieldDescription>
                  {(fieldErrors.username as Array<string>).join(", ")}
                </FieldDescription>
              )}
            </Field>
            <Field data-invalid={"password" in fieldErrors}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                aria-invalid={"password" in fieldErrors}
              />
              {"password" in fieldErrors && (
                <FieldDescription>
                  {(fieldErrors.password as Array<string>).join(", ")}
                </FieldDescription>
              )}
            </Field>
            <Field data-invalid={"confirmPassword" in fieldErrors}>
              <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
                aria-invalid={"confirmPassword" in fieldErrors}
              />
              {"confirmPassword" in fieldErrors && (
                <FieldDescription>
                  {(fieldErrors.confirmPassword as Array<string>).join(", ")}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="setupForm"
          className="w-full"
          onSubmit={onSubmit}
          disabled={createAdminMutation.isPending}
        >
          Save
          {createAdminMutation.isPending && <Spinner data-icon="inline-start" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
