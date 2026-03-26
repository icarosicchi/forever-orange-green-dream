import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

export interface MemoryGridItem {
  id: number;
  memory_id: number;
  title: string;
  content: string;
  image_url: string | null;
}

interface MemoryGridProps {
  memories: MemoryGridItem[];
  onEdit?: (memory: MemoryGridItem) => void;
  onDelete?: (memory: MemoryGridItem) => void;
}

const MemoryGrid: React.FC<MemoryGridProps> = ({ memories, onEdit, onDelete }) => {
  const hasActions = Boolean(onEdit || onDelete);

  return (
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
          {hasActions && (
            <CardContent className="pt-0 px-4 pb-4">
              <div className="flex gap-1">
                {onEdit && (
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(memory)}>
                    <Pencil className="h-3 w-3" />
                  </Button>
                )}
                {onDelete && (
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onDelete(memory)}>
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default MemoryGrid;
