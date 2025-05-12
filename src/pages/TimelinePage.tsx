
import React from 'react';
import Header from '@/components/Header';
import Timeline from '@/components/Timeline';

const TimelinePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header totalPages={130} />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gradient">
          Nossa Linha do Tempo
        </h1>
        
        <p className="text-xl mb-12 text-center text-foreground/80 max-w-2xl mx-auto">
          Uma jornada por diversos momentos especiais que vivemos
        </p>
        
        <Timeline />
      </main>
    </div>
  );
};

export default TimelinePage;
