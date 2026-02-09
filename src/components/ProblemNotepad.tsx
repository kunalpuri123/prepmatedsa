import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Save, Brush, Eraser, Trash2, Image as ImageIcon } from 'lucide-react';

interface ProblemNotepadProps {
  content: string;
  onSave: (content: string) => void;
  isSaving?: boolean;
}

type NotepadPayload = {
  version: 1;
  notes: string;
  dryRun: string;
  complexity: string;
  code: string;
  diagram: string;
};

const defaultPayload: NotepadPayload = {
  version: 1,
  notes: '',
  dryRun: '',
  complexity: '',
  code: '',
  diagram: '',
};

const templates = [
  {
    label: 'Array',
    value: 'Array: [a0] [a1] [a2] [a3]\nIndex:  0   1   2   3\n',
  },
  {
    label: 'Linked List',
    value: 'Linked List:\n[1] -> [2] -> [3] -> null\n',
  },
  {
    label: 'Tree',
    value: 'Binary Tree:\n    1\n   / \\\n  2   3\n / \\   \\\n4   5   6\n',
  },
  {
    label: 'Graph',
    value: 'Graph:\nA -- B\n|  / |\nC -- D\n',
  },
  {
    label: 'Stack/Queue',
    value: 'Stack (top -> bottom): [3, 2, 1]\nQueue (front -> back): [1, 2, 3]\n',
  },
];

export const ProblemNotepad: React.FC<ProblemNotepadProps> = ({
  content,
  onSave,
  isSaving = false,
}) => {
  const parsed = useMemo(() => {
    try {
      const json = JSON.parse(content || '');
      if (json && json.version === 1) {
        return json as NotepadPayload;
      }
    } catch {
      // ignore
    }
    return { ...defaultPayload, notes: content || '' };
  }, [content]);

  const [notes, setNotes] = useState(parsed.notes);
  const [dryRun, setDryRun] = useState(parsed.dryRun);
  const [complexity, setComplexity] = useState(parsed.complexity);
  const [code, setCode] = useState(parsed.code);
  const [diagram, setDiagram] = useState(parsed.diagram);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [strokeSize, setStrokeSize] = useState(3);
  const [strokeColor, setStrokeColor] = useState('#22c55e');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setNotes(parsed.notes);
    setDryRun(parsed.dryRun);
    setComplexity(parsed.complexity);
    setCode(parsed.code);
    setDiagram(parsed.diagram);
  }, [parsed]);

  useEffect(() => {
    if (!canvasRef.current || !diagram) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = diagram;
  }, [diagram]);

  const applyStroke = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = strokeSize;
    ctx.strokeStyle = tool === 'eraser' ? '#0f1115' : strokeColor;

    if (!lastPoint.current) {
      lastPoint.current = { x, y };
    }
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastPoint.current = { x, y };
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const rect = event.currentTarget.getBoundingClientRect();
    applyStroke(event.clientX - rect.left, event.clientY - rect.top);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const rect = event.currentTarget.getBoundingClientRect();
    applyStroke(event.clientX - rect.left, event.clientY - rect.top);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    lastPoint.current = null;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDiagram('');
  };

  const handleSaveDiagram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    setDiagram(dataUrl);
  };

  const handleSave = () => {
    const payload: NotepadPayload = {
      version: 1,
      notes,
      dryRun,
      complexity,
      code,
      diagram,
    };
    onSave(JSON.stringify(payload));
  };

  const insertTemplate = (value: string) => {
    setDryRun((prev) => `${prev}${prev ? '\n' : ''}${value}`);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Solution Approach</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Explain the approach, key insights, edge cases."
            className="min-h-[140px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Dry Run</label>
          <Textarea
            value={dryRun}
            onChange={(e) => setDryRun(e.target.value)}
            placeholder="Step-by-step execution trace."
            className="min-h-[140px] font-mono"
          />
          <div className="flex flex-wrap gap-2">
            {templates.map((template) => (
              <Button
                key={template.label}
                type="button"
                size="sm"
                variant="outline"
                onClick={() => insertTemplate(template.value)}
              >
                {template.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Complexity Analysis</label>
          <Textarea
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            placeholder="Time and space complexity."
            className="min-h-[120px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Code Block</label>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code or pseudocode here."
            className="min-h-[120px] font-mono"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Diagram / Whiteboard</label>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant={tool === 'pen' ? 'default' : 'outline'}
            onClick={() => setTool('pen')}
          >
            <Brush className="h-4 w-4" /> Pen
          </Button>
          <Button
            type="button"
            size="sm"
            variant={tool === 'eraser' ? 'default' : 'outline'}
            onClick={() => setTool('eraser')}
          >
            <Eraser className="h-4 w-4" /> Eraser
          </Button>
          <Input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="h-9 w-12 p-1"
            title="Stroke color"
          />
          <Input
            type="number"
            min={1}
            max={12}
            value={strokeSize}
            onChange={(e) => setStrokeSize(parseInt(e.target.value) || 3)}
            className="h-9 w-20"
            title="Stroke size"
          />
          <Button type="button" size="sm" variant="outline" onClick={handleSaveDiagram}>
            <ImageIcon className="h-4 w-4" /> Save Sketch
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={handleClear}>
            <Trash2 className="h-4 w-4" /> Clear
          </Button>
        </div>
        <div className="rounded-lg border border-border bg-card p-2">
          <canvas
            ref={canvasRef}
            width={800}
            height={280}
            className="w-full rounded-md bg-[#0f1115]"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Notes'}
        </Button>
      </div>
    </div>
  );
};
