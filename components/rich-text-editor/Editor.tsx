"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import MenuBar from "./menu-bar";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    // content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] prose prose-sm sm:prose-base md:prose-lg lg:prose-xl xl:prose-2xl focus:outline-none",
      },
    },
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
