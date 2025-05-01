
import React from 'react';
import Header from '@/components/Header';
import RotatingBackground from '@/components/RotatingBackground';
import { Heart, Book, List, CheckSquare, Music, Timer, Timeline, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TOTAL_MEMORIES = 100;

// Caminho das imagens armazenadas localmente na pasta public/images/
const backgroundImages = [
  '/images/memory1.jpg',
  '/images/memory2.jpg',
  '/images/memory3.jpg'
];

const Index = () => {
  return (
    <>
      <RotatingBackground images={backgroundImages} />
      <Header totalPages={TOTAL_MEMORIES} />
      
      <main className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block animate-float mb-6">
              <Heart className="h-16 w-16 fill-love-orange stroke-love-orange-dark" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Nossa Linda História
            </h1>
            
            <p className="text-xl mb-8 text-foreground/80">
              A journey of our most precious moments together, one memory at a time.
            </p>
            
            <div className="love-card mb-12">
              <p className="italic text-lg text-gray-700">
                "Every moment spent with you is a moment I treasure forever."
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Button asChild className="bg-love-green hover:bg-love-green-dark flex items-center gap-2">
                <Link to="/about"><Book size={18} /> About Us</Link>
              </Button>
              <Button asChild className="bg-love-orange hover:bg-love-orange-dark flex items-center gap-2">
                <Link to="/love-list"><Heart size={18} /> What I Love</Link>
              </Button>
              <Button asChild className="bg-love-green hover:bg-love-green-dark flex items-center gap-2">
                <Link to="/bucket-list"><CheckSquare size={18} /> Bucket List</Link>
              </Button>
              <Button asChild className="bg-love-orange hover:bg-love-orange-dark flex items-center gap-2">
                <Link to="/playlist"><Music size={18} /> Playlist</Link>
              </Button>
              <Button asChild className="bg-love-green hover:bg-love-green-dark flex items-center gap-2">
                <Link to="/countdown"><Timer size={18} /> Countdowns</Link>
              </Button>
              <Button asChild className="bg-love-orange hover:bg-love-orange-dark flex items-center gap-2">
                <Link to="/timeline"><Timeline size={18} /> Timeline</Link>
              </Button>
              <Button asChild className="bg-love-green hover:bg-love-green-dark flex items-center gap-2">
                <Link to="/memory/1"><Image size={18} /> Memories</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 bg-white/80 backdrop-blur-sm border-t border-love-green-light/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            Made with <Heart className="inline-block h-4 w-4 fill-love-orange stroke-none" /> for you
          </p>
        </div>
      </footer>
    </>
  );
};

export default Index;
