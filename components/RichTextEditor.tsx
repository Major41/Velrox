"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  Trash2,
} from "lucide-react";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Image.configure({
        allowBase64: true,
        inline: false,
      }),
    ],
    content: value || "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose max-w-none focus:outline-none px-4 py-3 text-foreground bg-background rounded-b-lg min-h-96",
      },
      handleDOMEvents: {
        focus: (view) => {
          return false;
        },
      },
    },
  });

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="border rounded-lg overflow-hidden bg-background animate-pulse">
        <div className="h-12 bg-card" />
        <div className="h-96 bg-card/50" />
      </div>
    );
  }

  const addLink = () => {
    const url = window.prompt("Enter the URL:", "https://");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const clearContent = () => {
    if (window.confirm("Are you sure you want to clear all content?")) {
      editor.commands.clearContent(true);
      onChange("");
    }
  };

  return (
    <div className="border border-input rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border-b bg-card">
        <div className="flex flex-wrap gap-1">
          {/* Basic Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold (Ctrl+B)"
            icon={Bold}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic (Ctrl+I)"
            icon={Italic}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            isActive={editor.isActive("code")}
            title="Inline Code"
            icon={Code}
          />
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Headings */}
        <div className="flex flex-wrap gap-1">
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
            icon={Heading1}
          />
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
            icon={Heading2}
          />
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Lists */}
        <div className="flex flex-wrap gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
            icon={List}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
            icon={ListOrdered}
          />
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Blockquote and Link */}
        <div className="flex flex-wrap gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Blockquote"
            icon={Quote}
          />
          <ToolbarButton
            onClick={addLink}
            isActive={editor.isActive("link")}
            title="Add Link"
            icon={LinkIcon}
          />
        </div>

        <div className="h-6 w-px bg-border" />

        {/* History */}
        <div className="flex flex-wrap gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            title="Undo"
            icon={Undo}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            title="Redo"
            icon={Redo}
          />
          <ToolbarButton
            onClick={clearContent}
            title="Clear Content"
            icon={Trash2}
            isActive={false}
            variant="destructive"
          />
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
}

function ToolbarButton({
  onClick,
  disabled,
  isActive,
  title,
  icon: Icon,
  variant = "default",
}: {
  onClick: () => void;
  disabled?: boolean;
  isActive: boolean;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: "default" | "destructive";
}) {
  const baseClasses =
    "p-2 rounded transition-colors cursor-pointer flex items-center justify-center";
  const activeClasses = isActive
    ? "bg-primary/20 text-primary"
    : "bg-transparent text-foreground hover:bg-muted";
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed hover:bg-transparent"
    : "";
  const variantClasses =
    variant === "destructive"
      ? "hover:text-destructive hover:bg-destructive/10"
      : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${baseClasses} ${activeClasses} ${disabledClasses} ${variantClasses}`}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
