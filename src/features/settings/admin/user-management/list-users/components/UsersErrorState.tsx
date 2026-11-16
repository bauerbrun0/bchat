import { OctagonAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface Props {
  message: string;
  retry: () => void;
}

export default function UsersErrorState({ message, retry }: Props) {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-destructive/10">
          <OctagonAlertIcon className="stroke-destructive" />
        </EmptyMedia>
        <EmptyTitle>Failed to fetch users</EmptyTitle>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" onClick={retry}>
          Retry
        </Button>
      </EmptyContent>
    </Empty>
  );
}
