import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import type { CustomTRPCClientValidationError } from "#/trpc/server/types";

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
import { useTRPC } from "#/trpc/client/react";
import { isCustomTRPCClientValidationError } from "#/trpc/client/utils";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const loginMutation = useMutation(trpc.users.loginUser.mutationOptions());

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState<
    CustomTRPCClientValidationError["data"]["zodError"]["fieldErrors"]
  >({});

  async function onSubmit() {
    try {
      await loginMutation.mutateAsync({ username, password });
      navigate({ to: "/" });
    } catch (error: unknown) {
      if (isCustomTRPCClientValidationError(error)) {
        setFieldErrors(error.data.zodError.fieldErrors);
        return;
      }

      setFieldErrors({});

      const description =
        error instanceof Error ? error.message : "An error occurred while logging in.";
      toast.add({
        type: "error",
        title: "Something went wrong",
        description: description,
      });
    }
  }

  return (
    <div className="flex h-screen items-center p-4">
      <Card className="mx-auto h-fit max-w-md sm:w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Log in using your username and password.</CardDescription>
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
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            form="setupForm"
            className="w-full"
            onClick={onSubmit}
            disabled={loginMutation.isPending}
          >
            Login
            {loginMutation.isPending && <Spinner data-icon="inline-start" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
