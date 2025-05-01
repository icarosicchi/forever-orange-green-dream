import React from 'react';
import Header from '@/components/Header';
import RotatingBackground from '@/components/RotatingBackground';
import MemoryGrid from '@/components/MemoryGrid';
import { Heart } from 'lucide-react';

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
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
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
          </div>
          
          {/* Passando o total de memórias para o MemoryGrid */}
          <MemoryGrid totalMemories={TOTAL_MEMORIES} />
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
