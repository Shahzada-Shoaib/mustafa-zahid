'use client';

import { useEffect, forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface RichTextEditorRef {
  getEditor: () => any;
}

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
  ({ value, onChange, placeholder = 'Write your blog content here...' }, ref) => {
    const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-red-400 hover:text-red-300 underline',
          },
        }),
      ],
      content: value,
      editorProps: {
        attributes: {
          class: 'blog-content',
          'data-placeholder': placeholder,
        },
      },
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
    });

    // Update editor content when value prop changes
    useEffect(() => {
      if (editor && value !== editor.getHTML()) {
        editor.commands.setContent(value, { emitUpdate: false });
      }
    }, [value, editor]);

    useImperativeHandle(ref, () => ({
      getEditor: () => editor,
    }));

    if (!editor) {
      return null;
    }

    return (
      <div className="rich-text-editor-wrapper">
        {/* Toolbar */}
        <div className="toolbar border-b border-white/10 bg-white/5 p-2 flex flex-wrap gap-2">
          {/* Text Formatting */}
          <div className="flex gap-1 border-r border-white/10 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-red-600/20 transition-colors ${
                editor.isActive('bold') ? 'bg-red-600/30 text-red-400' : 'text-white/70 hover:text-white'
              }`}
              title="Bold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4v8a4 4 0 01-4 4H6a4 4 0 01-4-4V8a4 4 0 014-4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-red-600/20 transition-colors ${
                editor.isActive('italic') ? 'bg-red-600/30 text-red-400' : 'text-white/70 hover:text-white'
              }`}
              title="Italic"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded hover:bg-red-600/20 transition-colors ${
                editor.isActive('underline') ? 'bg-red-600/30 text-red-400' : 'text-white/70 hover:text-white'
              }`}
              title="Underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19V5h14v14" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded hover:bg-red-600/20 transition-colors ${
                editor.isActive('strike') ? 'bg-red-600/30 text-red-400' : 'text-white/70 hover:text-white'
              }`}
              title="Strikethrough"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
              </svg>
            </button>
          </div>

          {/* Headings */}
          <div className="flex gap-1 border-r border-white/10 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-2 rounded hover:bg-red-600/20 transition-colors ${
                editor.isActive('heading', { level: 1 }) ? 'bg-red-600/30 text-red-400' : 'text-white/70 hover:text-white'
              }`}
              title="Heading 1"
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-2 rounded hover:bg-red-600/20 transition-colors ${
                editor.isActive('heading', { level: 2 }) ? 'bg-red-600/30 text-red-400' : 'text-white/70 hover:text-white'
              }`}
              title="Heading 2"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`p-2 rounded hover:bg-red-600/20 transition-colors ${
                editor.isActive('heading', { level: 3 }) ? 'bg-red-600/30 text-red-400' : 'text-white/70 hover:text-white'
              }`}
              title="Heading 3"
            >
              H3
            </button>
          </div>

          {/* Lists */}
          <div className="flex gap-1 border-r border-white/10 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded hover:bg-red-600/20 transition-colors ${
                editor.isActive('bulletList') ? 'bg-red-600/30 text-red-400' : 'text-white/70 hover:text-white'
              }`}
              title="Bullet List"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded hover:bg-red-600/20 transition-colors ${
                editor.isActive('orderedList') ? 'bg-red-600/30 text-red-400' : 'text-white/70 hover:text-white'
              }`}
              title="Numbered List"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </button>
          </div>

          {/* Link */}
          <div className="flex gap-1 border-r border-white/10 pr-2">
            <button
              type="button"
              onClick={() => {
                const url = window.prompt('Enter URL:');
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              className={`p-2 rounded hover:bg-red-600/20 transition-colors ${
                editor.isActive('link') ? 'bg-red-600/30 text-red-400' : 'text-white/70 hover:text-white'
              }`}
              title="Add Link"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              disabled={!editor.isActive('link')}
              className="p-2 rounded hover:bg-red-600/20 transition-colors text-white/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              title="Remove Link"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </button>
          </div>

          {/* Clear Formatting */}
          <button
            type="button"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            className="p-2 rounded hover:bg-red-600/20 transition-colors text-white/70 hover:text-white"
            title="Clear Formatting"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Editor Content */}
        <div className="editor-content bg-white/5 min-h-[300px]">
          <EditorContent editor={editor} />
        </div>

        <style jsx global>{`
          .rich-text-editor-wrapper {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            overflow: hidden;
          }

          .editor-content .ProseMirror {
            outline: none;
            min-height: 300px;
            padding: 1rem;
          }

          .editor-content .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: rgba(255, 255, 255, 0.4);
            pointer-events: none;
            height: 0;
          }

          .toolbar button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
