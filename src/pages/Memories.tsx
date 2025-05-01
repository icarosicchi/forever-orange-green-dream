import React from 'react'
import MemoryGrid from '@/components/MemoryGrid'
import Header from '@/components/Header'  // ① importa o Header

const TOTAL_MEMORIES = 100

export default function Memories() {
  return (
    <div className="min-h-screen bg-love-gradient pt-24 pb-16">
      <Header totalPages = {100}/>    {/* ② insere o Header aqui */}
      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gradient">
          Todas as Memórias
        </h1>
        <MemoryGrid totalMemories={TOTAL_MEMORIES} />
      </main>
    </div>
  )
}
