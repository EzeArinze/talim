import { type Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Strikethrough } from "lucide-react";
import { cn } from "@/lib/utils";

interface RTEMenuBarProps {
  editor: Editor | null;
}

function MenuBar({ editor }: RTEMenuBarProps) {
  if (!editor) return null;

  return (
    <div>
      <TooltipProvider>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                className={cn(
                  editor.isActive("bold")
                    ? "bg-muted text-muted-foreground"
                    : ""
                )}
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                className={cn(
                  editor.isActive("italic")
                    ? "bg-muted text-muted-foreground"
                    : ""
                )}
              >
                <Italic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
                className={cn(
                  editor.isActive("strike")
                    ? "bg-muted text-muted-foreground"
                    : ""
                )}
              >
                <Strikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Strike</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}

export default MenuBar;
