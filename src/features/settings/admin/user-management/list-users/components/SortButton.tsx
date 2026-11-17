import { useSelector } from "@tanstack/react-store";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Button } from "#/components/ui/button";

import type { Field } from "../../schema";

import { listUsersStore } from "../store";

interface Props {
  field: Field;
  label: string;
}

export default function SortButton({ field, label }: Props) {
  const sort = useSelector(listUsersStore, (state) => state.sort);

  return (
    <Button variant="ghost" onClick={() => listUsersStore.actions.toggleSort(field)}>
      <span>{label}</span>
      {sort?.by === field && sort.order === "asc" && <ArrowUpIcon />}
      {sort?.by === field && sort.order === "desc" && <ArrowDownIcon />}
    </Button>
  );
}
