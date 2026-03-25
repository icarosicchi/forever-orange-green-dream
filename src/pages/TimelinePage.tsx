
import React from 'react';
import Header from '@/components/Header';
import Timeline from '@/components/Timeline';

const TimelinePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header totalPages={130} />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Nossa Linha do Tempo
          </h1>
          
          <p className="text-left text-xl text-foreground/80">
            Uma jornada por diversos momentos especiais que vivemos
          </p>
        </div>
        
        <Timeline />
      </main>
    </div>
  );
};

export default TimelinePage;
