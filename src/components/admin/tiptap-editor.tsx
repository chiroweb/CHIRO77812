"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useCallback, useRef } from "react";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

function MenuBar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    }

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL을 입력하세요", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const btnClass = (isActive: boolean) =>
    `px-2 py-1 text-xs border transition-colors duration-200 cursor-pointer ${
      isActive
        ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
        : "border-[#e5e5e3] text-[#6b6b6b] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
    }`;

  return (
    <div className="flex flex-wrap gap-1 p-3 border-b border-[#e5e5e3] bg-[#fafaf8]">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive("bold"))}>
        B
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive("italic"))}>
        I
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive("strike"))}>
        S
      </button>

      <span className="w-px bg-[#e5e5e3] mx-1" />

      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive("heading", { level: 2 }))}>
        H2
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive("heading", { level: 3 }))}>
        H3
      </button>

      <span className="w-px bg-[#e5e5e3] mx-1" />

      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive("bulletList"))}>
        • List
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive("orderedList"))}>
        1. List
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive("blockquote"))}>
        &ldquo; Quote
      </button>

      <span className="w-px bg-[#e5e5e3] mx-1" />

      <button type="button" onClick={setLink} className={btnClass(editor.isActive("link"))}>
        Link
      </button>
      <button type="button" onClick={() => fileInputRef.current?.click()} className={btnClass(false)}>
        Image
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      <span className="w-px bg-[#e5e5e3] mx-1" />

      <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btnClass(false)}>
        ─ HR
      </button>
    </div>
  );
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: "max-w-full h-auto" } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-[#FF4D00] underline" } }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none p-4 min-h-[400px] outline-none focus:outline-none",
      },
    },
  });

  return (
    <div className="border border-[#e5e5e3]">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
