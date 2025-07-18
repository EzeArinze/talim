import { type Editor } from "@tiptap/react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import { Bold } from "lucide-react";

interface RTEMenuBarProps {
  editor: Editor | null;
}

function MenuBar({ editor }: RTEMenuBarProps) {
  if (!editor) return null;

  return (
    <TooltipProvider>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle>
              <Bold className="size-5" />
            </Toggle>
          </TooltipTrigger>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export default MenuBar;
