
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentPage?: number;
  totalPages: number;
}

const Header: React.FC<HeaderProps> = ({ currentPage, totalPages }) => {
  const showNavigation = currentPage !== undefined;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-love-green hover:text-love-green-dark transition-colors">
          <Heart className="h-5 w-5 fill-love-orange stroke-love-orange" />
          <span className="font-bold text-xl">Eu e Tu, Tatu</span>
        </Link>
        
        {showNavigation && (
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-love-green/50 hover:border-love-green text-love-green"
              disabled={currentPage <= 1}
              asChild
            >
              <Link to={`/memory/${currentPage - 1}`}>
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Link>
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border-love-green/50 hover:border-love-green text-love-green"
              disabled={currentPage >= totalPages}
              asChild
            >
              <Link to={`/memory/${currentPage + 1}`}>
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
