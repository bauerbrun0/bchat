import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

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
import { authClient } from "#/lib/auth/client";
import { getSession } from "#/lib/auth/functions";

export const Route = createFileRoute("/login")({
  beforeLoad: async ({ context }) => {
    const isServerInitialized = await context.queryClient.query(
      context.trpc.serverInfo.getIsInitialized.queryOptions(),
    );
    if (!isServerInitialized) {
      throw redirect({
        to: "/setup",
      });
    }

    const session = await getSession();
    if (session) {
      throw redirect({
        to: "/app",
      });
    }
  },
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{
    username: string | null;
    password: string | null;
  }>({ username: null, password: null });

  function clearFieldErrors() {
    setFieldErrors({ username: null, password: null });
  }

  async function onSubmit() {
    setLoading(true);
    clearFieldErrors();
    const { data, error } = await authClient.signIn.username({
      username,
      password,
    });
    setLoading(false);

    if (!error) {
      await navigate({ to: redirect ?? "/app" });
      toast.add({
        type: "info",
        title: "Login successful.",
        description: `Welcome back ${data.user.username}!`,
      });
      return;
    }

    if (error.code === "INVALID_USERNAME_OR_PASSWORD") {
      setFieldErrors({ ...fieldErrors, password: "Invalid username or password." });
      return;
    }

    toast.add({
      type: "error",
      title: "Something went wrong",
      description: error.message,
    });
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
            id="loginForm"
          >
            <FieldGroup>
              <Field data-invalid={!!fieldErrors.username}>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  type="text"
                  id="username"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                  aria-invalid={!!fieldErrors.username}
                />
                {fieldErrors.username && (
                  <FieldDescription>{fieldErrors.username}</FieldDescription>
                )}
              </Field>
              <Field data-invalid={!!fieldErrors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  aria-invalid={!!fieldErrors.password}
                />
                {fieldErrors.password && (
                  <FieldDescription>{fieldErrors.password}</FieldDescription>
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            form="loginForm"
            className="w-full"
            onSubmit={onSubmit}
            disabled={loading}
          >
            Login
            {loading && <Spinner data-icon="inline-start" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
