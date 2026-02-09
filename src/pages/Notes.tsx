import React, { useEffect, useMemo, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, FileText, Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { dsaTopics, getAllProblems, Problem } from '@/data/dsaProblems';
import { DifficultyBadge } from '@/components/DifficultyBadge';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

interface NoteWithProblem {
  problem_id: string;
  content: string;
  problem?: Problem;
}

type DiagramPayload = {
  type: 'array' | 'linkedlist' | 'tree' | 'graph';
  nodes: Array<{ id: string; x: number; y: number; label: string }>;
  edges: Array<{ id: string; source: string; target: string }>;
};

type NotesPayload = {
  version: 3;
  html: string;
  diagram?: DiagramPayload;
};

const Notes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<NoteWithProblem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNote, setActiveNote] = useState<NoteWithProblem | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth');
      } else {
        loadNotes(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadNotes = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_notes')
        .select('problem_id, content')
        .eq('user_id', userId);

      if (error) throw error;

      const allProblems = getAllProblems();
      const problemsMap = new Map(allProblems.map(p => [p.id, p]));

      const notesWithProblems = (data || [])
        .filter(note => {
          if (!note.content || note.content.trim() === '') return false;
          return normalizeNotesContent(note.content).trim().length > 0;
        })
        .map(note => ({
          ...note,
          problem: problemsMap.get(note.problem_id),
        }));

      setNotes(notesWithProblems);
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const normalizeNotesContent = (content: string) => {
    try {
      const json = JSON.parse(content);
      if (json && json.version === 3 && typeof json.html === 'string') {
        const tmp = document.createElement('div');
        tmp.innerHTML = json.html;
        return tmp.textContent || tmp.innerText || '';
      }
      if (json && json.version === 2 && Array.isArray(json.blocks)) {
        const lines: string[] = [];
        json.blocks.forEach((block: { type: string; data: any }) => {
          switch (block.type) {
            case 'heading':
              lines.push(String(block.data?.text || '').toUpperCase());
              break;
            case 'text':
              lines.push(String(block.data?.text || ''));
              break;
            case 'checklist':
              (block.data?.items || []).forEach((item: any) => {
                lines.push(`- [${item.done ? 'x' : ' '}] ${item.text || ''}`);
              });
              break;
            case 'code':
              lines.push('Code:');
              lines.push(String(block.data?.code || ''));
              break;
            case 'dryrun':
              lines.push('Dry Run:');
              (block.data?.steps || []).forEach((step: any, idx: number) => {
                lines.push(`Step ${idx + 1}: ${step.text || ''}`);
              });
              break;
            case 'complexity':
              lines.push(`Time: ${block.data?.time || ''}`);
              lines.push(`Space: ${block.data?.space || ''}`);
              break;
            case 'array':
              lines.push(`Array: ${(block.data?.values || []).join(', ')}`);
              break;
            case 'linkedlist':
              lines.push(`LinkedList: ${(block.data?.values || []).join(' -> ')} -> null`);
              break;
            case 'tree':
              lines.push(`Tree nodes: ${(block.data?.values || []).join(', ')}`);
              break;
            case 'graph':
              lines.push(`Graph nodes: ${(block.data?.nodes || []).join(', ')}`);
              lines.push(`Graph edges: ${(block.data?.edges || []).join(', ')}`);
              break;
            default:
              break;
          }
        });
        return lines.filter(Boolean).join('\n');
      }
    } catch {
      // not JSON
    }

    const tmp = document.createElement('div');
    tmp.innerHTML = content;
    return tmp.textContent || tmp.innerText || '';
  };

  const convertLegacyToHtml = (payload: { blocks: Array<{ type: string; data: any }> }) => {
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

  const parseNotesPayload = (content: string): NotesPayload => {
    try {
      const json = JSON.parse(content);
      if (json && json.version === 3 && typeof json.html === 'string') {
        return json as NotesPayload;
      }
      if (json && json.version === 2 && Array.isArray(json.blocks)) {
        return { version: 3, html: convertLegacyToHtml(json) };
      }
    } catch {
      // ignore
    }
    return { version: 3, html: content || '' };
  };

  const buildDiagramSvg = (diagram?: DiagramPayload) => {
    if (!diagram || diagram.nodes.length === 0) return '';
    const padding = 40;
    const nodes = diagram.nodes.map((node) => ({
      ...node,
      x: node.x + padding,
      y: node.y + padding,
    }));
    const maxX = Math.max(...nodes.map((node) => node.x), 0) + padding;
    const maxY = Math.max(...nodes.map((node) => node.y), 0) + padding;

    const nodeMap = new Map(nodes.map((node) => [node.id, node]));
    const edges = diagram.edges
      .map((edge) => ({
        ...edge,
        source: nodeMap.get(edge.source),
        target: nodeMap.get(edge.target),
      }))
      .filter((edge) => edge.source && edge.target);

    const renderNode = (node: typeof nodes[number]) => {
      const label = node.label || '';
      return `
        <g>
          <rect x="${node.x - 36}" y="${node.y - 18}" rx="8" ry="8" width="72" height="36" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"></rect>
          <text x="${node.x}" y="${node.y + 4}" fill="#f8fafc" font-size="12" text-anchor="middle">${label}</text>
        </g>
      `;
    };

    const renderEdge = (edge: typeof edges[number]) => {
      const source = edge.source!;
      const target = edge.target!;
      return `
        <line x1="${source.x}" y1="${source.y}" x2="${target.x}" y2="${target.y}" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />
      `;
    };

    return `
      <svg width="100%" height="${Math.max(180, maxY)}" viewBox="0 0 ${Math.max(320, maxX)} ${Math.max(180, maxY)}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill="#0b1120" rx="12" />
        ${edges.map(renderEdge).join('')}
        ${nodes.map(renderNode).join('')}
      </svg>
    `;
  };

  const buildNoteHtml = (note: NoteWithProblem) => {
    const payload = parseNotesPayload(note.content);
    const diagramSvg = buildDiagramSvg(payload.diagram);
    return `
      <section class="note-card">
        <div class="note-header">
          <div>
            <h2>${note.problem?.title || 'Untitled Problem'}</h2>
            <p class="note-meta">${note.problem?.difficulty || ''}</p>
          </div>
          <a href="${note.problem?.url || '#'}">${note.problem?.url || ''}</a>
        </div>
        <div class="note-body">
          ${payload.html}
        </div>
        ${diagramSvg ? `<div class="note-diagram">${diagramSvg}</div>` : ''}
      </section>
    `;
  };

  const orderIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    let index = 0;
    dsaTopics.forEach((topic) => {
      topic.patterns.forEach((pattern) => {
        pattern.problems.forEach((problem) => {
          map.set(problem.id, index);
          index += 1;
        });
      });
    });
    return map;
  }, []);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      const aIndex = a.problem ? orderIndexMap.get(a.problem.id) ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
      const bIndex = b.problem ? orderIndexMap.get(b.problem.id) ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
      if (aIndex !== bIndex) return aIndex - bIndex;
      return (a.problem?.title || '').localeCompare(b.problem?.title || '');
    });
  }, [notes, orderIndexMap]);

  const downloadNotes = async () => {
    setIsDownloading(true);
    let container: HTMLDivElement | null = null;
    try {
      container = document.createElement('div');
      container.className = 'notes-export';
      container.innerHTML = `
        <style>
          .notes-export {
            font-family: 'Inter', system-ui, sans-serif;
            padding: 32px;
            width: 900px;
            color: #0f172a;
            background: #f8fafc;
          }
          .notes-export h1 {
            font-size: 28px;
            margin-bottom: 4px;
          }
          .notes-export .export-meta {
            font-size: 12px;
            color: #64748b;
            margin-bottom: 24px;
          }
          .note-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
          }
          .note-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 16px;
          }
          .note-header h2 {
            font-size: 20px;
            margin: 0 0 4px 0;
          }
          .note-header a {
            font-size: 11px;
            color: #2563eb;
            word-break: break-all;
          }
          .note-meta {
            font-size: 12px;
            color: #64748b;
            margin: 0;
          }
          .note-body p { margin: 8px 0; }
          .note-body pre {
            background: #0f172a;
            color: #e2e8f0;
            padding: 12px;
            border-radius: 12px;
            overflow-x: auto;
            font-size: 12px;
          }
          .note-body ul, .note-body ol {
            padding-left: 18px;
          }
          .note-diagram {
            margin-top: 16px;
            padding: 12px;
            border-radius: 12px;
            background: #0b1120;
          }
        </style>
        <h1>DSA Notes</h1>
        <div class="export-meta">Generated on ${new Date().toLocaleDateString()}</div>
        ${sortedNotes.filter(note => note.problem).map(buildNoteHtml).join('')}
      `;

      container.style.position = 'fixed';
      container.style.top = '-10000px';
      container.style.left = '-10000px';
      document.body.appendChild(container);

      const canvas = await html2canvas(container, { scale: 2, backgroundColor: '#f8fafc' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 0;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('dsa-notes.pdf');
      toast.success('Notes downloaded successfully!');
    } catch (error) {
      console.error('Error downloading notes:', error);
      toast.error('Failed to download notes');
    } finally {
      if (container && document.body.contains(container)) {
        document.body.removeChild(container);
      }
      setIsDownloading(false);
    }
  };

  const filteredNotes = notes.filter(note => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      note.problem?.title.toLowerCase().includes(query) ||
      normalizeNotesContent(note.content).toLowerCase().includes(query)
    );
  });

  const orderedFilteredNotes = useMemo(() => {
    const filteredIds = new Set(filteredNotes.map(note => note.problem_id));
    return sortedNotes.filter(note => filteredIds.has(note.problem_id));
  }, [filteredNotes, sortedNotes]);

  const openFlipbook = (note: NoteWithProblem) => {
    setActiveNote(note);
  };

  const closeFlipbook = () => {
    setActiveNote(null);
  };

  const problemMetaById = useMemo(() => {
    const map = new Map<string, { topic: string; pattern: string }>();
    dsaTopics.forEach((topic) => {
      topic.patterns.forEach((pattern) => {
        pattern.problems.forEach((problem) => {
          map.set(problem.id, { topic: topic.name, pattern: pattern.name });
        });
      });
    });
    return map;
  }, []);

  const notesByTopic = useMemo(() => {
    const notesMap = new Map(orderedFilteredNotes.map(note => [note.problem_id, note]));
    return dsaTopics
      .map(topic => {
        const patterns = topic.patterns
          .map(pattern => {
            const notes = pattern.problems
              .map(problem => notesMap.get(problem.id))
              .filter(Boolean) as NoteWithProblem[];
            return { id: pattern.id, name: pattern.name, notes };
          })
          .filter(pattern => pattern.notes.length > 0);
        return { id: topic.id, name: topic.name, patterns };
      })
      .filter(topic => topic.patterns.length > 0);
  }, [orderedFilteredNotes]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={handleLogout} userName={user.email} />
      
      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                My Notes
              </h1>
              <p className="text-muted-foreground mt-1">
                All your problem notes in one place
              </p>
            </div>
            <Button 
              onClick={downloadNotes}
              disabled={notes.length === 0 || isDownloading}
              className="bg-primary hover:bg-primary/90"
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Download All Notes
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Notes List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredNotes.length === 0 ? (
            <Card className="stat-card border-border">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
                <p className="text-muted-foreground text-center">
                  Start adding notes to problems by clicking the notes icon on any problem row.
                </p>
                <Button 
                  onClick={() => navigate('/problems')}
                  className="mt-4"
                  variant="outline"
                >
                  Go to Problems
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} found
              </p>

              <Accordion type="multiple" className="space-y-4">
                {notesByTopic.map((topic) => (
                  <AccordionItem key={topic.id} value={topic.id} className="border border-border rounded-lg overflow-hidden bg-card">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/40">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span className="text-lg font-semibold">{topic.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {topic.patterns.reduce((sum, pattern) => sum + pattern.notes.length, 0)} notes
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <Accordion type="multiple" className="space-y-3">
                        {topic.patterns.map((pattern) => (
                          <AccordionItem
                            key={pattern.id}
                            value={`${topic.id}-${pattern.id}`}
                            className="border border-border/50 rounded-lg overflow-hidden"
                          >
                            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                              <div className="flex items-center justify-between w-full pr-4">
                                <span className="font-medium text-sm">{pattern.name}</span>
                                <span className="text-xs text-muted-foreground">{pattern.notes.length} notes</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3">
                              <div className="space-y-2">
                                {pattern.notes.map((note) => (
                                  <Card key={note.problem_id} className="stat-card border-border">
                                    <CardHeader className="pb-2">
                                      <div className="flex items-center justify-between">
                                        <CardTitle className="text-base flex items-center gap-3">
                                          {note.problem?.title || 'Unknown Problem'}
                                          {note.problem && <DifficultyBadge difficulty={note.problem.difficulty} />}
                                        </CardTitle>
                                      </div>
                                      {note.problem && (
                                        <a 
                                          href={note.problem.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-xs text-primary hover:underline"
                                        >
                                          {note.problem.url}
                                        </a>
                                      )}
                                    </CardHeader>
                                    <CardContent>
                                      <Button
                                        variant="outline"
                                        onClick={() => openFlipbook(note)}
                                      >
                                        Open Notes
                                      </Button>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </main>

      {activeNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-4xl">
            <Card className="overflow-hidden shadow-2xl border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">{activeNote.problem?.title || 'Notes'}</CardTitle>
                  {activeNote.problem && (
                    <a
                      href={activeNote.problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      {activeNote.problem.url}
                    </a>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {problemMetaById.get(activeNote.problem?.id || '')?.topic || 'Unknown'} •{' '}
                    {problemMetaById.get(activeNote.problem?.id || '')?.pattern || 'Unknown'}
                  </p>
                </div>
                <Button variant="ghost" onClick={closeFlipbook}>Close</Button>
              </CardHeader>
              <CardContent className="pb-6">
                <div
                  className="prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: parseNotesPayload(activeNote.content).html }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
