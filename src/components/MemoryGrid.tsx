
import React from 'react';
import { Link } from 'react-router-dom';

interface MemoryGridProps {
  totalMemories: number;
}

const MemoryGrid: React.FC<MemoryGridProps> = ({ totalMemories }) => {
  // Create an array of memory indices
  const memories = Array.from({ length: totalMemories }, (_, i) => i + 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gradient">Veja Nossos Momentos e Memórias</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {memories.map((memoryId) => (
          <Link 
            key={memoryId} 
            to={`/memory/${memoryId}`}
            className="memory-link group"
          >
            <div className="aspect-square bg-love-green-light/20 rounded flex items-center justify-center">
              <span className="text-xl font-bold text-love-green group-hover:text-love-orange transition-colors">
                {memoryId}
              </span>
            </div>
            <div className="mt-2 text-sm text-center text-gray-600">Memory {memoryId}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MemoryGrid;
