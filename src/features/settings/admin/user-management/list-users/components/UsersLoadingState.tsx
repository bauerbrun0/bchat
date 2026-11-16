import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "#/components/ui/empty";
import { Spinner } from "#/components/ui/spinner";

export default function UsersLoadingState() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Loading Users</EmptyTitle>
        <EmptyDescription>
          We're fetching the users. This should only take a moment.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
