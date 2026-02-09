import React, { useEffect, useMemo, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const statusOptions = [
  { value: 'applied', label: 'Applied', color: 'bg-blue-500/15 text-blue-400', chart: '#3b82f6' },
  { value: 'interview', label: 'Interview', color: 'bg-amber-500/15 text-amber-400', chart: '#f59e0b' },
  { value: 'offer', label: 'Offer', color: 'bg-emerald-500/15 text-emerald-400', chart: '#10b981' },
  { value: 'rejected', label: 'Rejected', color: 'bg-rose-500/15 text-rose-400', chart: '#f43f5e' },
  { value: 'no_reply', label: 'No Reply Yet', color: 'bg-slate-500/15 text-slate-300', chart: '#94a3b8' },
];

const statusLabelMap = new Map(statusOptions.map(option => [option.value, option.label]));

const statusBadgeClass = (status: string) => {
  return statusOptions.find(option => option.value === status)?.color || 'bg-muted text-muted-foreground';
};

interface JobApplication {
  id: string;
  user_id: string;
  company_name: string;
  job_title: string;
  job_link: string | null;
  package: string | null;
  status: string;
  applied_date: string;
  created_at: string;
  updated_at: string;
}

const Applications = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [jobPackage, setJobPackage] = useState('');
  const [status, setStatus] = useState('applied');
  const [appliedDate, setAppliedDate] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth');
      } else {
        loadApplications(session.user.id);
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

  const loadApplications = async (userId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_job_applications')
        .select('*')
        .eq('user_id', userId)
        .order('applied_date', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications((data || []) as JobApplication[]);
    } catch (error) {
      console.error('Error loading applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleAdd = async () => {
    if (!user) return;
    if (!companyName.trim() || !jobTitle.trim()) {
      toast.error('Company name and job title are required');
      return;
    }

    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('user_job_applications')
        .insert({
          user_id: user.id,
          company_name: companyName.trim(),
          job_title: jobTitle.trim(),
          job_link: jobLink.trim() || null,
          package: jobPackage.trim() || null,
          status,
          applied_date: appliedDate,
        })
        .select('*')
        .single();

      if (error) throw error;
      setApplications(prev => [data as JobApplication, ...prev]);
      setCompanyName('');
      setJobTitle('');
      setJobLink('');
      setJobPackage('');
      setStatus('applied');
      setAppliedDate(new Date().toISOString().slice(0, 10));
      toast.success('Application added');
    } catch (error) {
      console.error('Error adding application:', error);
      toast.error('Failed to add application');
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (id: string, nextStatus: string) => {
    try {
      const { error } = await supabase
        .from('user_job_applications')
        .update({ status: nextStatus })
        .eq('id', id);
      if (error) throw error;
      setApplications(prev => prev.map(app => (app.id === id ? { ...app, status: nextStatus } : app)));
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_job_applications')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setApplications(prev => prev.filter(app => app.id !== id));
      toast.success('Application removed');
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to remove application');
    }
  };

  const filteredApplications = applications.filter(app => {
    const query = search.toLowerCase();
    const matchesSearch =
      app.company_name.toLowerCase().includes(query) ||
      app.job_title.toLowerCase().includes(query) ||
      (app.job_link || '').toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    applications.forEach(app => {
      counts[app.status] = (counts[app.status] || 0) + 1;
    });
    return counts;
  }, [applications]);

  const chartData = statusOptions.map(option => ({
    name: option.label,
    value: statusCounts[option.value] || 0,
    color: option.chart,
  }));

  const barData = statusOptions.map(option => ({
    status: option.label,
    count: statusCounts[option.value] || 0,
    color: option.chart,
  }));

  const pipelineCount =
    (statusCounts.applied || 0) + (statusCounts.interview || 0) + (statusCounts.no_reply || 0);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={handleLogout} userName={user.email} />

      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-foreground">Job Applications</h1>
            <p className="text-muted-foreground">
              Track every application, interview, offer, rejection, and no-response.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{applications.length}</div>
                <p className="text-sm text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pipelineCount}</div>
                <p className="text-sm text-muted-foreground">Applied + Interview + No reply</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Offers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{statusCounts.offer || 0}</div>
                <p className="text-sm text-muted-foreground">Success so far</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="h-[360px]">
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
                      {chartData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="h-[360px]">
              <CardHeader>
                <CardTitle>Pipeline Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ left: 8, right: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {barData.map((entry) => (
                        <Cell key={entry.status} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Add Application</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Company name"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
              <Input
                placeholder="Job title"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
              />
              <Input
                placeholder="Job link"
                value={jobLink}
                onChange={(event) => setJobLink(event.target.value)}
              />
              <Input
                placeholder="Package / CTC"
                value={jobPackage}
                onChange={(event) => setJobPackage(event.target.value)}
              />
              <Input
                type="date"
                value={appliedDate}
                onChange={(event) => setAppliedDate(event.target.value)}
              />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="md:col-span-3">
                <Button onClick={handleAdd} disabled={isSaving} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Add Application'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <CardTitle>Applications</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Search company, title, link"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="sm:w-[240px]"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="sm:w-[180px]">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-10 text-center text-muted-foreground">Loading applications...</div>
              ) : filteredApplications.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground">No applications yet.</div>
              ) : (
                <div className="space-y-3">
                  {filteredApplications.map(app => (
                    <div
                      key={app.id}
                      className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-lg border border-border bg-card p-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-base">{app.company_name}</h3>
                          <Badge className={statusBadgeClass(app.status)}>
                            {statusLabelMap.get(app.status) || app.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{app.job_title}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span>Applied: {app.applied_date}</span>
                          {app.package && <span>Package: {app.package}</span>}
                        </div>
                        {app.job_link && (
                          <a
                            href={app.job_link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            View job <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Select value={app.status} onValueChange={(value) => handleStatusChange(app.id, value)}>
                          <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(app.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Applications;
