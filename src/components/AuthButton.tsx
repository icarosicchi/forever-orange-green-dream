
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AuthButton = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <Button variant="outline" size="sm" className="bg-white/80" disabled>
        <span className="animate-pulse">Loading...</span>
      </Button>
    );
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="bg-white/80 flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-love-green text-white">
                {user.email ? user.email.substring(0, 2).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline">Account</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="text-sm text-muted-foreground" disabled>
            {user.email}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()} className="text-red-500 cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button asChild variant="outline" size="sm" className="bg-white/80">
      <Link to="/auth" className="flex items-center gap-2">
        <LogIn className="h-4 w-4" />
        <span>Sign In</span>
      </Link>
    </Button>
  );
};

export default AuthButton;
