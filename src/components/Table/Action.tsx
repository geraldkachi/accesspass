import React, { useState } from "react";
import type { ReactNode } from "react";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";

export interface ActionOption {
  name: string;
  action?: () => void;
  hide?: boolean;
  disabled?: boolean;
}

export interface ActionProps {
  options?: ActionOption[];
  offset?: number;
  alignment?: "start" | "center" | "end";
  alignOffset?: number;
  extraClass?: string;
  children: ReactNode;
}

const Action: React.FC<ActionProps> = (props) => {
  const { 
    options = [], 
    offset = 5, 
    alignment = "start", 
    alignOffset = 0, 
    extraClass = "", 
    children 
  } = props;
  
  const [isOpen, setIsOpen] = useState(false);
  const hasVisibleOption = (options?.filter((option) => !option?.hide).length ?? 0) > 0;

  return (
    <div className={clsx(!isOpen && "z-1", isOpen && "z-5")}>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>{children}</Popover.Trigger>
        <Popover.Content
          className="relative z-40"
          sideOffset={offset}
          align={alignment}
          alignOffset={alignOffset}
        >
          {hasVisibleOption && (
            <div
              className={clsx(
                "bg-white max-h-[250px] rounded-[4px] py-2 px-2 overflow-auto shadow-[0px_5px_30px_rgba(0,0,0,0.08)] min-w-[200px]",
                extraClass
              )}
            >
              {options
                .filter((option) => !option?.hide)
                .map((option, index) => (
                  <button
                    type="button"
                    key={`Action-${option.name}-${index}`}
                    disabled={option?.disabled ?? false}
                    className={clsx(
                      "text-left hover:bg-yep-border/30 text-yep-inputText py-2 px-3",
                      "font-normal outline-none flex items-center",
                      "w-full text-[14px] truncate block",
                      option?.disabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => {
                      if (option?.action) {
                        option.action();
                      }
                      setIsOpen(false);
                    }}
                  >
                    <span className="font-C-Regular">{option.name}</span>
                  </button>
                ))}
            </div>
          )}
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export default Action;