
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import MemoryCard from '@/components/MemoryCard';

const TOTAL_MEMORIES = 100;

const MemoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const memoryId = parseInt(id || "0", 10);
  
  // If the ID is not valid, redirect to home
  if (isNaN(memoryId) || memoryId < 1 || memoryId > TOTAL_MEMORIES) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header currentPage={memoryId} totalPages={TOTAL_MEMORIES} />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <MemoryCard 
            // You can customize these for each memory
            imageUrl={`https://source.unsplash.com/random/800x600?nature,love&sig=${memoryId}`}
            title={`Memory #${memoryId}`}
            content="This is where you'll write your personal message to your girlfriend. You can customize each of these 100 pages with your own text and images."
          />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Memory {memoryId} of {TOTAL_MEMORIES}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemoryPage;
