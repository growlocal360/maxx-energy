"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import EditorToolbar from "./EditorToolbar";

interface RichTextEditorProps {
  content: JSONContent | null;
  onChange: (content: JSONContent) => void;
  placeholder?: string;
  onImageUpload?: () => void;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing...",
  onImageUpload,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-maxx-accent hover:text-maxx-mint underline",
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-maxx-400 before:float-left before:h-0 before:pointer-events-none",
      }),
    ],
    content: content || undefined,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-maxx max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
  });

  return (
    <div className="bg-maxx-800 border border-maxx-700 rounded-lg overflow-hidden">
      <EditorToolbar editor={editor} onImageUpload={onImageUpload} />
      <EditorContent editor={editor} />
    </div>
  );
}
