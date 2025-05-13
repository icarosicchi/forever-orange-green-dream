
import React from 'react'
import MemoryGrid from '@/components/MemoryGrid'
import Header from '@/components/Header'
import { useAuth } from '@/contexts/AuthContext'

const TOTAL_MEMORIES = 130

export default function Memories() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-love-gradient pt-24 pb-16">
      <Header totalPages={130} />
      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gradient">
          Todas as Memórias
        </h1>
        <p className="text-center mb-8 text-gray-700">
          Explore todas as nossas memórias juntos.
        </p>
        <MemoryGrid totalMemories={TOTAL_MEMORIES} />
      </main>
    </div>
  )
}
