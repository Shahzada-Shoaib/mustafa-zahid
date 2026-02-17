'use client';

import { useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    const quillRef = useRef<ReactQuill>(null);

    useImperativeHandle(ref, () => ({
      getEditor: () => quillRef.current?.getEditor(),
    }));

  // Custom toolbar with internal link button
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        link: function(this: any) {
          const quill = quillRef.current?.getEditor();
          if (!quill) return;
          
          const range = quill.getSelection();
          if (!range) return;
          
          const url = prompt('Enter URL:');
          if (url) {
            quill.formatText(range.index, range.length, 'link', url);
          }
        }
      }
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'link', 'image'
  ];

  return (
    <div className="rich-text-editor-wrapper">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="rich-text-editor"
      />
      <style jsx global>{`
        .rich-text-editor-wrapper {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .rich-text-editor .ql-container {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 14px;
          min-height: 300px;
        }
        
        .rich-text-editor .ql-editor {
          color: white;
          min-height: 300px;
        }
        
        .rich-text-editor .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.4);
          font-style: normal;
        }
        
        .rich-text-editor .ql-toolbar {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px;
        }
        
        .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: rgba(255, 255, 255, 0.7);
        }
        
        .rich-text-editor .ql-toolbar .ql-fill {
          fill: rgba(255, 255, 255, 0.7);
        }
        
        .rich-text-editor .ql-toolbar button:hover,
        .rich-text-editor .ql-toolbar button.ql-active {
          background: rgba(220, 38, 38, 0.2);
        }
        
        .rich-text-editor .ql-toolbar button:hover .ql-stroke,
        .rich-text-editor .ql-toolbar button.ql-active .ql-stroke {
          stroke: #ef4444;
        }
        
        .rich-text-editor .ql-toolbar button:hover .ql-fill,
        .rich-text-editor .ql-toolbar button.ql-active .ql-fill {
          fill: #ef4444;
        }
        
        .rich-text-editor .ql-snow .ql-picker {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .rich-text-editor .ql-snow .ql-picker-options {
          background: rgba(10, 10, 10, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .rich-text-editor .ql-snow .ql-picker-item {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .rich-text-editor .ql-snow .ql-picker-item:hover {
          background: rgba(220, 38, 38, 0.2);
          color: #ef4444;
        }
        
        .rich-text-editor .ql-snow a {
          color: #ef4444;
        }
        
        .rich-text-editor .ql-snow a:hover {
          color: #f87171;
        }
      `}</style>
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;

