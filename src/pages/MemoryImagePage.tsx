import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

const TOTAL_MEMORIES = 100;

const MemoryImagePage = () => {
  const { id } = useParams<{ id: string }>();
  const memoryId = parseInt(id || "0", 10);

  // Se o ID não for válido, redireciona para a home
  if (isNaN(memoryId) || memoryId < 1 || memoryId > TOTAL_MEMORIES) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-love-gradient flex justify-center items-center">
      {/* Exibindo apenas a imagem, preenchendo a tela */}
      <img 
        src={`/images/memory${memoryId}.jpg`} 
        alt={`Memory #${memoryId}`} 
        className="max-w-full h-auto object-contain"
      />
    </div>
  );
};

export default MemoryImagePage;
