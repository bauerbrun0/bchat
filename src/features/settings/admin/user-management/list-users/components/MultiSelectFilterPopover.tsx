import { FilterIcon } from "lucide-react";
import { Fragment, useState } from "react";

import { Button } from "#/components/ui/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "#/components/ui/combobox";
import { Field } from "#/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover";

interface Props {
  items: { label: string; value: string }[];
  storedFilter: string[] | undefined;
  storeFilter: (value: string[] | undefined) => void;
  zIndex?: number;
}

export default function MultiSelectFilterPopover({
  items,
  storedFilter,
  storeFilter,
  zIndex = 100,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>(storedFilter ?? []);
  const anchor = useComboboxAnchor();

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(open) => {
        if (!open) storeFilter(value.length === 0 ? undefined : value);
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
        <Field>
          <Combobox multiple autoHighlight items={items} value={value} onValueChange={setValue}>
            <ComboboxChips ref={anchor} className="w-full">
              <ComboboxValue>
                {(values) => (
                  <Fragment>
                    {values.map((value: string) => (
                      <ComboboxChip key={value}>{value}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput />
                  </Fragment>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor} zIndex={zIndex}>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
      </PopoverContent>
    </Popover>
  );
}
