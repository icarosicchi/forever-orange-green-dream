
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import MemoryPage from "./pages/MemoryPage";
import NotFound from "./pages/NotFound";
import Memories from './pages/Memories';
import AboutPage from './pages/AboutPage';
import LoveListPage from './pages/LoveListPage';
import BucketListPage from './pages/BucketListPage';
import PlaylistPage from './pages/PlaylistPage';
import CountdownPage from './pages/CountdownPage';
import TimelinePage from './pages/TimelinePage';
import AuthPage from './pages/AuthPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/memory/:id" element={<MemoryPage />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/love-list" element={<LoveListPage />} />
            <Route path="/bucket-list" element={<BucketListPage />} />
            <Route path="/playlist" element={<PlaylistPage />} />
            <Route path="/countdown" element={<CountdownPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
