
import React from 'react';
import Header from '@/components/Header';
import Timeline from '@/components/Timeline';

const TimelinePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header totalPages={100} />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gradient">
          Our Timeline
        </h1>
        
        <p className="text-xl mb-12 text-center text-foreground/80 max-w-2xl mx-auto">
          A journey through all the special moments we've shared together.
        </p>
        
        <Timeline />
      </main>
    </div>
  );
};

export default TimelinePage;
