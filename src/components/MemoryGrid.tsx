
import React, { useState, useEffect } from 'react';
import MemoryCard from '@/components/MemoryCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface MemoryGridProps {
  totalMemories: number;
  refresh?: boolean;
}

interface Memory {
  id: number;
  memory_id: number;
  title: string;
  content: string;
  image_url: string | null;
}

const MemoryGrid: React.FC<MemoryGridProps> = ({ totalMemories, refresh }) => {
  const { user } = useAuth();
  const [savedMemories, setSavedMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch saved memories from Supabase
  useEffect(() => {
    const fetchMemories = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('memories')
          .select('*')
          .order('memory_id', { ascending: true });
          
        if (error) throw error;
        
        if (data) {
          setSavedMemories(data);
        }
      } catch (error) {
        console.error('Error fetching memories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMemories();
  }, [user, refresh]);

  // Create an array with all memory slots (1 to totalMemories)
  const allMemorySlots = Array.from({ length: totalMemories }, (_, index) => {
    const memoryId = index + 1;
    
    // Check if this memory ID exists in saved memories
    const savedMemory = savedMemories.find(m => m.memory_id === memoryId);
    
    return {
      memoryId,
      saved: !!savedMemory,
      title: savedMemory ? savedMemory.title : `Memória #${memoryId}`,
      content: savedMemory ? savedMemory.content : '',
      imageUrl: savedMemory?.image_url || `/images/memory${memoryId}.jpg`
    };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {loading ? (
        <div className="col-span-full text-center py-10">
          <p>Carregando memórias...</p>
        </div>
      ) : (
        allMemorySlots.map((memory) => (
          <MemoryCard
            key={memory.memoryId}
            memoryId={memory.memoryId}
            imageUrl={memory.imageUrl}
            title={memory.title}
            content={memory.content || ''}
            isSaved={memory.saved}
          />
        ))
      )}
    </div>
  );
};

export default MemoryGrid;
