import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  Code, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Quote,
  Undo,
  Redo,
  Palette,
  Save,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const lowlight = createLowlight(common);

interface RichNotesEditorProps {
  content: string;
  onSave: (content: string) => void;
  isSaving?: boolean;
}

const colors = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#ffffff', // white
  '#94a3b8', // gray
];

export const RichNotesEditor: React.FC<RichNotesEditorProps> = ({
  content,
  onSave,
  isSaving = false,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      TextStyle,
      Color,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: content || '<p>Start writing your notes here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '<p>Start writing your notes here...</p>');
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const handleSave = () => {
    const html = editor.getHTML();
    onSave(html);
  };

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/50">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleBold().run()}
          data-active={editor.isActive('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          data-active={editor.isActive('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleCode().run()}
          data-active={editor.isActive('code')}
        >
          <Code className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          data-active={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          data-active={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          data-active={editor.isActive('heading', { level: 3 })}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          data-active={editor.isActive('bulletList')}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          data-active={editor.isActive('orderedList')}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          data-active={editor.isActive('blockquote')}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          data-active={editor.isActive('codeBlock')}
        >
          <Code className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <div className="flex gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded-full border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => editor.chain().focus().setColor(color).run()}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
        
        <div className="flex-1" />
        
        <Button 
          onClick={handleSave} 
          size="sm" 
          className="bg-primary hover:bg-primary/90"
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Notes'}
        </Button>
      </div>
      
      {/* Editor Content */}
      <EditorContent editor={editor} className="min-h-[200px]" />
      
      <style>{`
        .ProseMirror {
          min-height: 200px;
        }
        .ProseMirror h1 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: hsl(var(--foreground));
        }
        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
          color: hsl(var(--foreground));
        }
        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
          color: hsl(var(--foreground));
        }
        .ProseMirror p {
          margin: 0.5rem 0;
          color: hsl(var(--foreground));
        }
        .ProseMirror code {
          background: hsl(var(--muted));
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: monospace;
          color: hsl(var(--primary));
        }
        .ProseMirror pre {
          background: hsl(var(--muted));
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 0.5rem 0;
          overflow-x: auto;
        }
        .ProseMirror pre code {
          background: none;
          padding: 0;
          color: hsl(var(--foreground));
        }
        .ProseMirror blockquote {
          border-left: 3px solid hsl(var(--primary));
          padding-left: 1rem;
          margin: 0.5rem 0;
          color: hsl(var(--muted-foreground));
          font-style: italic;
        }
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .ProseMirror li {
          margin: 0.25rem 0;
        }
        [data-active="true"] {
          background: hsl(var(--primary) / 0.2);
        }
      `}</style>
    </div>
  );
};
