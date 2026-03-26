import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import MemoryCard from '@/components/MemoryCard';
import { supabase } from '@/integrations/supabase/client';

interface MemoryRecord {
  memory_id: number;
  title: string;
  content: string;
  image_url: string | null;
}

const MemoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const memoryId = Number.parseInt(id || '0', 10);
  const [memory, setMemory] = useState<MemoryRecord | null>(null);
  const [totalMemories, setTotalMemories] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchMemory = async () => {
      if (Number.isNaN(memoryId) || memoryId < 1) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const [{ data: memoryData, error: memoryError }, { count, error: countError }] = await Promise.all([
        supabase
          .from('memories')
          .select('memory_id, title, content, image_url')
          .eq('memory_id', memoryId)
          .maybeSingle(),
        supabase
          .from('memories')
          .select('*', { count: 'exact', head: true }),
      ]);

      if (memoryError || countError || !memoryData) {
        setNotFound(true);
      } else {
        setMemory(memoryData);
        setTotalMemories(count || 0);
      }

      setLoading(false);
    };

    fetchMemory();
  }, [memoryId]);

  if (notFound) {
    return <Navigate to="/" />;
  }

  if (loading || !memory) {
    return (
      <div className="min-h-screen bg-love-gradient">
        <Header currentPage={memoryId || 1} totalPages={totalMemories || 130} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header currentPage={memory.memory_id} totalPages={totalMemories} />

      <main className="pt-24 pb-16 container mx-auto px-4">
        <Link
          to="/memories"
          className="mt-2 inline-flex items-center px-4 py-1 bg-love-green-dark text-white rounded hover:bg-love-green transition"
        >
          ←
        </Link>
        <div className="max-w-3xl mx-auto">
          <MemoryCard
            memoryId={memory.memory_id}
            imageUrl={memory.image_url || undefined}
            title={memory.title}
            content={memory.content}
          />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Memoria {memory.memory_id} de {totalMemories}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemoryPage;
