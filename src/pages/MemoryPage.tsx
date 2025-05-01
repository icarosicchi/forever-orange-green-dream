
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import MemoryCard from '@/components/MemoryCard';
import { getMemoryText } from '@/utils/memoryTexts';

const TOTAL_MEMORIES = 100;

const MemoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const memoryId = parseInt(id || "0", 10);

  // Se o ID não for válido, redireciona para a home
  if (isNaN(memoryId) || memoryId < 1 || memoryId > TOTAL_MEMORIES) {
    return <Navigate to="/" />;
  }

  const memoryContent = getMemoryText(memoryId);

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header currentPage={memoryId} totalPages={TOTAL_MEMORIES} />

      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <MemoryCard
            memoryId={memoryId}
            imageUrl={`/images/memory${memoryId}.jpg`} 
            title={`Memory #${memoryId}`}
            content={memoryContent}
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
