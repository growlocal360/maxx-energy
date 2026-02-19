"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

interface RichTextContentProps {
  content: JSONContent;
}

export default function RichTextContent({ content }: RichTextContentProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full my-6",
        },
      }),
      TiptapLink.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-maxx-accent hover:text-maxx-mint underline",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Underline,
    ],
    content,
    editable: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none prose-headings:text-maxx-900 prose-p:text-maxx-700 prose-strong:text-maxx-900 prose-ul:text-maxx-700 prose-ol:text-maxx-700 prose-li:text-maxx-700",
      },
    },
  });

  return <EditorContent editor={editor} />;
}
