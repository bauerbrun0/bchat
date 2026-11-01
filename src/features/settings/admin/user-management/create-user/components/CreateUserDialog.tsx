import { useSelector } from "@tanstack/react-store";
import { useEffect, useState } from "react";

import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { Spinner } from "#/components/ui/spinner";
import { toast } from "#/components/ui/toast";
import { settingsStore } from "#/features/settings/store";
import { authClient } from "#/lib/auth/client";

import type { CreateUserValidationError } from "../userSchema";

const roles = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
];

export default function CreateUserDialog({ onCreate }: { onCreate: () => void }) {
  const open = useSelector(settingsStore, (state) => state.newUserDialogOpen);

  const [username, setUsername] = useState("");
  const [displayUsername, setDisplayUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");

  const [loading, setLoading] = useState(false);

  const [validationError, setValidationError] = useState<CreateUserValidationError>({ errors: [] });

  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    displayUsername?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
  }>({});

  useEffect(() => {
    const username = validationError.properties?.data?.properties?.username?.errors[0];
    const displayUsername =
      validationError.properties?.data?.properties?.displayUsername?.errors[0];
    const password = validationError.properties?.password?.errors[0];
    const role = validationError.properties?.role?.errors[0];
    setFieldErrors({
      ...fieldErrors,
      username,
      displayUsername,
      password,
      role,
    });
  }, [validationError]);

  function clearFields() {
    setUsername("");
    setDisplayUsername("");
    setPassword("");
    setConfirmPassword("");
    setRole("user");
  }

  async function onSubmit() {
    setLoading(true);
    setFieldErrors({});

    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: "Passwords do not match." });
      setLoading(false);
      return;
    }

    const { error } = await authClient.admin.createUser({
      name: "",
      email: `${username}@users.invalid`,
      password,
      role,
      data: {
        username,
        displayUsername,
      },
    });
    setLoading(false);

    if (!error) {
      toast.add({
        type: "info",
        title: "User created.",
        description: `User '${username}' has been created.`,
      });
      settingsStore.actions.setNewUserDialogOpen(false);
      onCreate();
      return;
    }

    if (
      error.code === "VALIDATION_ERROR" &&
      "cause" in error &&
      error.cause &&
      typeof error.cause === "object"
    ) {
      setValidationError(error.cause as CreateUserValidationError);
      return;
    }

    if (error.code === "INVALID_EMAIL") {
      setFieldErrors({
        username: "Invalid username.",
      });
      return;
    }

    if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
      setFieldErrors({
        username: "Username already taken.",
      });
      return;
    }

    toast.add({
      type: "error",
      title: "Something went wrong",
      description: error.message,
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        clearFields();
        setFieldErrors({});
        settingsStore.actions.setNewUserDialogOpen(value);
      }}
    >
      <form
        id="createUserForm"
        onSubmit={(e) => {
          e.preventDefault();
          void onSubmit();
        }}
      >
        <DialogContent zIndex={90} className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Create a new user. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field data-invalid={!!fieldErrors.username}>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                aria-invalid={!!fieldErrors.username}
              />
              {!!fieldErrors.username && <FieldError>{fieldErrors.username}</FieldError>}
            </Field>
            <Field data-invalid={!!fieldErrors.displayUsername}>
              <Label htmlFor="displayUsername">Display Username</Label>
              <Input
                id="displayUsername"
                name="displayUsername"
                value={displayUsername}
                onChange={({ target }) => setDisplayUsername(target.value)}
                aria-invalid={!!fieldErrors.displayUsername}
              />
              {!!fieldErrors.displayUsername && (
                <FieldError>{fieldErrors.displayUsername}</FieldError>
              )}
            </Field>
            <Field data-invalid={!!fieldErrors.password}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                aria-invalid={!!fieldErrors.password}
              />
              {!!fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
            </Field>
            <Field data-invalid={!!fieldErrors.confirmPassword}>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
                aria-invalid={!!fieldErrors.confirmPassword}
              />
              {!!fieldErrors.confirmPassword && (
                <FieldError>{fieldErrors.confirmPassword}</FieldError>
              )}
            </Field>
            <Field data-invalid={!!fieldErrors.role}>
              <Label htmlFor="role">Role</Label>
              <Select
                id="role"
                name="role"
                items={roles}
                value={role}
                onValueChange={(value) => setRole(value ?? "user")}
              >
                <SelectTrigger aria-invalid={!!fieldErrors.role} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent zIndex={100}>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!!fieldErrors.role && <FieldError>{fieldErrors.role}</FieldError>}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button className="flex-1" variant="outline" size="lg">
                  Cancel
                </Button>
              }
            />
            <Button
              className="flex-1"
              type="submit"
              size="lg"
              form="createUserForm"
              disabled={loading}
            >
              Save
              {loading && <Spinner data-icon="inline-start" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
