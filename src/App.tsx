import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import Planner from "./pages/Planner";
import Revision from "./pages/Revision";
import Auth from "./pages/Auth";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import Notes from "./pages/Notes";
import CalendarPage from "./pages/Calendar";
import Applications from "./pages/Applications";
import Contests from "./pages/Contests";
import NotFound from "./pages/NotFound";
import Store from "./pages/Store";
import SystemDesign from "./pages/SystemDesign";
import LearnInPublic from "./pages/LearnInPublic";
import Neetcode250 from "./pages/Neetcode250";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/neetcode250" element={<Neetcode250 />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/revision" element={<Revision />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/store" element={<Store />} />
          <Route path="/system-design" element={<SystemDesign />} />
          <Route path="/learn" element={<LearnInPublic />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
