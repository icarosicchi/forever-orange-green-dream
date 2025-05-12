
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import MemoryPage from "./pages/MemoryPage";
import NotFound from "./pages/NotFound";
import Memories from './pages/Memories';
import AboutPage from './pages/AboutPage';
import LoveListPage from './pages/LoveListPage';
import BucketListPage from './pages/BucketListPage';
import CountdownPage from './pages/CountdownPage';
import TimelinePage from './pages/TimelinePage';
import AuthPage from './pages/AuthPage';
import FoodsPage from './pages/FoodsPage';

const queryClient = new QueryClient();

// Protected route component to handle authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-love-green border-t-transparent rounded-full"></div>
    </div>;
  }

  if (!user) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/memory/:id" element={
              <ProtectedRoute>
                <MemoryPage />
              </ProtectedRoute>
            } />
            <Route path="/memories" element={
              <ProtectedRoute>
                <Memories />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            } />
            <Route path="/love-list" element={
              <ProtectedRoute>
                <LoveListPage />
              </ProtectedRoute>
            } />
            <Route path="/bucket-list" element={
              <ProtectedRoute>
                <BucketListPage />
              </ProtectedRoute>
            } />
            <Route path="/countdown" element={
              <ProtectedRoute>
                <CountdownPage />
              </ProtectedRoute>
            } />
            <Route path="/timeline" element={
              <ProtectedRoute>
                <TimelinePage />
              </ProtectedRoute>
            } />
            <Route path="/foods" element={
              <ProtectedRoute>
                <FoodsPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
