import { useQuery } from "@tanstack/react-query";
import { useSelector } from "@tanstack/react-store";

import { Button } from "#/components/ui/button";
import { settingsStore } from "#/features/settings/store";
import { useTRPC } from "#/lib/trpc/client/react";

import CreateUserDialog from "../create-user/components/CreateUserDialog";
import UserTable from "../list-users/components/UserTable";
import { userManagementStore } from "../store";

export default function UserManagementSettings() {
  const pagination = useSelector(userManagementStore, (state) => state.pagination);

  const trpc = useTRPC();
  const { data, isPending, isRefetching, isError, error, refetch } = useQuery(
    trpc.admin.userManagement.listUsers.queryOptions({
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
    }),
  );

  return (
    <>
      <div>
        <h2 className="mb-6 font-bold">Users</h2>
        {isPending || isRefetching ? (
          <span>Loading users...</span>
        ) : isError ? (
          <span>Error while loading users: {error.message}</span>
        ) : (
          <UserTable data={data} />
        )}
        <div className="my-6 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Create user</h2>
            <span>Add a new user.</span>
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="px-6 py-5"
            onClick={() => settingsStore.actions.setNewUserDialogOpen(true)}
          >
            Create
          </Button>
        </div>
      </div>
      <CreateUserDialog onCreate={() => void refetch()} />
    </>
  );
}
