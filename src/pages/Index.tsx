
import React from 'react';
import Header from '@/components/Header';
import { Heart, Book, List, CheckSquare, Music, Timer, Clock, Image, Pizza } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const TOTAL_MEMORIES = 100;

// Caminho das imagens armazenadas localmente na pasta public/images/
const backgroundImages = [
  '/images/memory1.jpg',
  '/images/memory2.jpg',
  '/images/memory3.jpg'
];

const Index = () => {
  const { signOut } = useAuth();
  
  return (
    <>
      <div
        style={{
          backgroundImage: "url('/images/fundo2.png')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          opacity: 0.9,
        }}
      />
      <Header totalPages={TOTAL_MEMORIES} />
      
      <main className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block animate-float mb-3">
              <Heart className="h-16 w-16 fill-love-orange stroke-love-orange-dark" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gradient-dark">
              Nossa Linda História
            </h1>
            
            <p className="text-xl mb-6 text-foreground/80">
              Uma jornada pela nossa história e por tudo que há de mais belo no nosso amor
            </p>
            
            <div className="love-card mb-6">
              <p className="italic text-lg text-gray-700">
                "Eu te amo, e isso basta para me fazer feliz."
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-1">
              <Button asChild className="bg-love-green hover:bg-love-green-dark flex items-center gap-2">
                <Link to="/about"><Book size={18} /> Sobre Nós</Link>
              </Button>
              <Button asChild className="bg-love-orange hover:bg-love-orange-dark flex items-center gap-2">
                <Link to="/love-list"><Heart size={18} /> O Que Amo em Você</Link>
              </Button>
              <Button asChild className="bg-love-green hover:bg-love-green-dark flex items-center gap-2">
                <Link to="/bucket-list"><CheckSquare size={18} /> Metas e Sonhos</Link>
              </Button>
              <Button asChild className="bg-love-orange hover:bg-love-orange-dark flex items-center gap-2">
                <Link to="/playlist"><Music size={18} /> Playlist</Link>
              </Button>
              <Button asChild className="bg-love-green hover:bg-love-green-dark flex items-center gap-2">
                <Link to="/countdown"><Timer size={18} /> Contagens Regressivas</Link>
              </Button>
              <Button asChild className="bg-love-orange hover:bg-love-orange-dark flex items-center gap-2">
                <Link to="/timeline"><Clock size={18} /> Linha do Tempo</Link>
              </Button>
              <Button asChild className="bg-love-green hover:bg-love-green-dark flex items-center gap-2">
                <Link to="/memories"><Image size={18} /> Memórias</Link>
              </Button>
              <Button asChild className="bg-love-orange hover:bg-love-orange-dark flex items-center gap-2">
                <Link to="/foods"><Pizza size={18} /> Comidas</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 bg-white/80 backdrop-blur-sm border-t border-love-green-light/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            Feito com <Heart className="inline-block h-4 w-4 fill-love-orange stroke-none" /> para você
          </p>
          <Button 
            variant="link" 
            size="sm" 
            onClick={signOut} 
            className="text-sm text-gray-500 mt-2"
          >
            Sair
          </Button>
        </div>
      </footer>
    </>
  );
};

export default Index;
