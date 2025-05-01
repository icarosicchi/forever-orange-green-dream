
import React from 'react';
import MemoryCard from '@/components/MemoryCard';
import { getMemoryText } from '@/utils/memoryTexts';

interface MemoryGridProps {
  totalMemories: number;
}

const MemoryGrid: React.FC<MemoryGridProps> = ({ totalMemories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: totalMemories }, (_, index) => {
        const memoryId = index + 1;
        return (
          <MemoryCard
            key={memoryId}
            memoryId={memoryId}
            imageUrl={`/images/memory${memoryId}.jpg`}
            title={`Memory #${memoryId}`}
            content={getMemoryText(memoryId)}
          />
        );
      })}
    </div>
  );
};

export default MemoryGrid;
