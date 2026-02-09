import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Star, 
  LogOut,
  Users,
  Download,
  Briefcase,
  Bell,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Network,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  onLogout?: () => void;
  userName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, userName }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const width = isCollapsed ? '5rem' : '16rem';
    document.documentElement.style.setProperty('--sidebar-width', width);
  }, [isCollapsed]);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/problems', label: 'All Problems', icon: BookOpen },
    { path: '/planner', label: 'Day Planner', icon: Calendar },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/revision', label: 'Revision Sheet', icon: Star },
    { path: '/system-design', label: 'System Design', icon: Network },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/applications', label: 'Applications', icon: Briefcase },
    { path: '/contests', label: 'Contest Alerts', icon: Bell },
    { path: '/learn', label: 'Learn in Public', icon: Share2 },
    { path: '/store', label: 'Store', icon: ShoppingBag },
    { path: '/notes', label: 'My Notes', icon: Download },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border shadow"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen bg-sidebar border-r border-sidebar-border transform transition-all duration-200',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'w-20' : 'w-64',
          'lg:translate-x-0 lg:z-40'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-sidebar-border">
            <img
              src="/prepmate-logo.png"
              alt="PrepMate"
              className={cn(
                'object-contain transition-all duration-200',
                isCollapsed ? 'h-10 w-10' : 'h-14 w-full'
              )}
            />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="lg:hidden ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="hidden lg:flex items-center justify-end px-4 py-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="h-9 w-9 rounded-full border-primary/40 text-primary hover:bg-primary/10 hover:border-primary shadow-sm transition-all"
              aria-label="Toggle sidebar"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Tooltip key={item.path} delayDuration={200}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'group flex items-center gap-3 rounded-lg transition-all duration-200',
                      isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3',
                      isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )}
                  >
                    <Icon className={cn('h-5 w-5 transition-transform duration-200', isActive ? 'scale-105' : 'group-hover:scale-105')} />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        {/* User section */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          {userName && (
            <div className={cn('mb-3 px-2', isCollapsed && 'text-center')}>
              {!isCollapsed && <p className="text-sm text-sidebar-foreground font-medium">{userName}</p>}
            </div>
          )}
          {onLogout && (
            <Button
              variant="ghost"
              onClick={onLogout}
              className={cn(
                'w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors',
                isCollapsed ? 'justify-center' : 'justify-start'
              )}
            >
              <LogOut className={cn('h-5 w-5', !isCollapsed && 'mr-3')} />
              {!isCollapsed && 'Sign Out'}
            </Button>
          )}
        </div>
        </div>
      </aside>
    </>
  );
};
