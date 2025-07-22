"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import MenuBar from "./menu-bar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Editor = ({ field }: { field: any }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] p-4 prose prose-sm sm:prose-base sm:prose lg:prose-lg xl:prose-xl dark:prose-invert focus:outline-none !w-full !max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "<p></p>",
    immediatelyRender: false,
  });

  return (
    <div className="w-full overflow-hidden border border-input dark:bg-input/30 rounded-lg shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
