
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import MemoryCard from '@/components/MemoryCard';
import { getMemoryText } from '@/utils/memoryTexts';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const TOTAL_MEMORIES = 130;

const MemoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const memoryId = parseInt(id || "0", 10);
  const { user } = useAuth();
  const [savedMemory, setSavedMemory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Se o ID não for válido, redireciona para a home
  if (isNaN(memoryId) || memoryId < 1 || memoryId > TOTAL_MEMORIES) {
    return <Navigate to="/" />;
  }

  // Fetch saved memory from Supabase
  useEffect(() => {
    const fetchMemory = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('memories')
          .select('*')
          .eq('memory_id', memoryId)
          .maybeSingle();
          
        if (error) throw error;
        
        if (data) {
          setSavedMemory(data);
        }
      } catch (error) {
        console.error('Error fetching memory:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMemory();
  }, [user, memoryId]);

  // Use saved memory data if available, otherwise fallback to default text
  const memoryTitle = savedMemory ? savedMemory.title : `Memória #${memoryId}`;
  const memoryContent = savedMemory ? savedMemory.content : getMemoryText(memoryId);
  const memoryImage = savedMemory?.image_url || `/images/memory${memoryId}.jpg`;

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header currentPage={memoryId} totalPages={TOTAL_MEMORIES} />

      <main className="pt-24 pb-16 container mx-auto px-4">
        {/* Link para a página de grid */}
        <Link
          to="/memories"
          className="mt-2 inline-flex items-center px-4 py-1 bg-love-green-dark text-white rounded hover:bg-love-green transition"
        >
          ←
        </Link>
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="text-center py-10">
              <p>Carregando memória...</p>
            </div>
          ) : (
            <MemoryCard
              memoryId={memoryId}
              imageUrl={memoryImage}
              title={memoryTitle}
              content={memoryContent}
              isSaved={!!savedMemory}
            />
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Memória {memoryId} de {TOTAL_MEMORIES}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemoryPage;
