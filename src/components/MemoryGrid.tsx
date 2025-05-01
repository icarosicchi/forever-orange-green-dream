import React from 'react';
import MemoryCard from '@/components/MemoryCard';

interface MemoryGridProps {
  totalMemories: number;
}

const MemoryGrid: React.FC<MemoryGridProps> = ({ totalMemories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: totalMemories }, (_, index) => {
        const memoryId = index + 1; // Definindo o memoryId
        return (
          <MemoryCard
            key={memoryId}
            memoryId={memoryId} // Passando o memoryId para o MemoryCard
            imageUrl={`/images/memory${memoryId}.jpg`} // Caminho das imagens locais
            title={`Memory #${memoryId}`}
            content={`This is memory #${memoryId}. Customize this content as needed.`}
          />
        );
      })}
    </div>
  );
};

export default MemoryGrid;
