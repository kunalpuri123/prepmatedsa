import React, { useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Code2, Quote, Highlighter, Image as ImageIcon, Undo, Redo } from 'lucide-react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import { createLowlight, common } from 'lowlight';

interface DsaNotesEditorProps {
  content: string;
  onSave: (content: string) => void;
  isSaving?: boolean;
}

type NotesPayload = {
  version: 3;
  html: string;
};

type LegacyPayload = {
  version: 2;
  blocks: Array<{ type: string; data: any }>;
};

const convertLegacyToHtml = (payload: LegacyPayload | string) => {
  if (typeof payload === 'string') {
    return payload;
  }
  const lines: string[] = [];
  payload.blocks.forEach((block) => {
    switch (block.type) {
      case 'heading':
        lines.push(`<h2>${block.data?.text || ''}</h2>`);
        break;
      case 'text':
        lines.push(`<p>${block.data?.text || ''}</p>`);
        break;
      case 'checklist':
        lines.push('<ul>');
        (block.data?.items || []).forEach((item: any) => {
          lines.push(`<li>${item.done ? '✅' : '⬜'} ${item.text || ''}</li>`);
        });
        lines.push('</ul>');
        break;
      case 'code':
        lines.push(`<pre><code>${block.data?.code || ''}</code></pre>`);
        break;
      case 'dryrun':
        lines.push('<h3>Dry Run</h3>');
        lines.push('<ol>');
        (block.data?.steps || []).forEach((step: any) => {
          lines.push(`<li>${step.text || ''}</li>`);
        });
        lines.push('</ol>');
        break;
      case 'complexity':
        lines.push(`<p><strong>Time:</strong> ${block.data?.time || ''}</p>`);
        lines.push(`<p><strong>Space:</strong> ${block.data?.space || ''}</p>`);
        break;
      default:
        break;
    }
  });
  return lines.join('');
};

const parsePayload = (content: string) => {
  try {
    const json = JSON.parse(content || '');
    if (json && json.version === 3 && typeof json.html === 'string') {
      return json as NotesPayload;
    }
    if (json && json.version === 2 && Array.isArray(json.blocks)) {
      return { version: 3, html: convertLegacyToHtml(json as LegacyPayload) } as NotesPayload;
    }
  } catch {
    // ignore
  }

  return {
    version: 3,
    html: content || '<p>Start writing your notes here...</p>',
  } as NotesPayload;
};

export const DsaNotesEditor: React.FC<DsaNotesEditorProps> = ({
  content,
  onSave,
  isSaving = false,
}) => {
  const parsed = useMemo(() => parsePayload(content), [content]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight,
      Image.configure({ inline: false, allowBase64: true }),
      CodeBlockLowlight.configure({ lowlight: createLowlight(common) }),
    ],
    content: parsed.html,
  });

  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(parsed.html || '<p>Start writing your notes here...</p>', false);
  }, [editor, parsed.html]);

  const handleSave = () => {
    const payload: NotesPayload = {
      version: 3,
      html: editor?.getHTML() || '',
    };
    onSave(JSON.stringify(payload));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = String(reader.result || '');
      editor.chain().focus().setImage({ src }).run();
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 border border-border bg-muted/40 rounded-lg p-2">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'bg-muted' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'bg-muted' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={editor?.isActive('underline') ? 'bg-muted' : ''}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor?.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
        >
          H2
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor?.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}
        >
          H3
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        >
          <Code2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().toggleHighlight().run()}
        >
          <Highlighter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <div className="dsa-notes-editor">
        <EditorContent editor={editor} className="dsa-notes-editor__content" />
      </div>

      <Button type="button" className="w-full" onClick={handleSave} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Notes'}
        <Save className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

