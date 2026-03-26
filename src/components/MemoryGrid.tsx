import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

export interface MemoryGridItem {
  id: number;
  memory_id: number;
  title: string;
  content: string;
  image_url: string | null;
}

interface MemoryGridProps {
  memories: MemoryGridItem[];
}

const MemoryGrid: React.FC<MemoryGridProps> = ({ memories }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {memories.map((memory) => (
      <Card key={memory.id} className="overflow-hidden border-love-orange/20 group">
        <Link to={`/memory/${memory.memory_id}`}>
          {memory.image_url && (
            <div className="w-full h-48 overflow-hidden">
              <img
                src={memory.image_url}
                alt={memory.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <CardContent className="p-4 bg-gradient-to-br from-white to-love-green-light/10">
            <h3 className="font-bold text-sm mb-1 text-gradient">{memory.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-3">{memory.content}</p>
          </CardContent>
        </Link>
      </Card>
    ))}
  </div>
);

export default MemoryGrid;
