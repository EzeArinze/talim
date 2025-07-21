"use client";

import {
  useEditor,
  // EditorContent
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// import Bold from "@tiptap/extension-bold";

import MenuBar from "./menu-bar";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
  });

  return (
    <div>
      <MenuBar editor={editor} />
      {/* <EditorContent editor={editor} /> */}
    </div>
  );
};

export default Editor;
