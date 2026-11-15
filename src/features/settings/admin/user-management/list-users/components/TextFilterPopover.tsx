import { FilterIcon, SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/ui/button";
import { Field } from "#/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover";

interface Props {
  storedFilter: string | undefined;
  storeFilter: (value: string | undefined) => void;
  zIndex?: number;
}

export default function TextFilterPopover({ storeFilter, storedFilter, zIndex = 100 }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(storedFilter ?? "");

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(open) => {
        if (!open) storeFilter(value ? value : undefined);
      }}
    >
      <PopoverTrigger
        render={
          <Button variant="ghost">
            <FilterIcon className={storedFilter ? "fill-foreground" : ""} />
          </Button>
        }
      />
      <PopoverContent zIndex={zIndex}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          <Field>
            <InputGroup>
              <InputGroupInput value={value} onChange={(e) => setValue(e.target.value)} />
              <InputGroupAddon align="inline-start">
                <SearchIcon className="text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Button type="button" variant="ghost" onClick={() => setValue("")}>
                  <XIcon className="text-muted-foreground" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <button className="hidden" type="submit"></button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
