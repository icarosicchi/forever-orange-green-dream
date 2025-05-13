// src/pages/FoodsPage.tsx
import React from 'react';
import Header from '@/components/Header';

const TOTAL_PAGES = 130;

// IDs das fotos que você quer exibir
const photoIds = [
  8, 22, 27, 32, 38, 39,
  59, 60, 61, 64, 65, 68,
  75, 76, 80, 81, 85, 99,
  100, 102, 108
];

const FoodsPage = () => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>, id: number) => {
    const img = e.currentTarget;
    // Se ainda não tentou a versão normal (sem underscore), tenta agora
    if (!img.dataset.triedNormal) {
      img.dataset.triedNormal = 'true';
      img.src = `/images/memory${id}.jpg`;
    }
  };

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={TOTAL_PAGES} />

      <main className="pt-24 pb-16 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4 text-center text-gradient">
          Nossas Comidas Favoritas
        </h1>

        <p className="mb-8 text-center text-lg text-muted-foreground">
          Aqui estão algumas das memórias registradas em fotos dos nossos momentos mais especiais juntos.
        </p>

        {/* flex-wrap gera um grid irregular, sem colunas fixas */}
        <div className="flex flex-wrap justify-center gap-6">
          {photoIds.map((id) => (
            <div
              key={id}
              className="overflow-hidden hover:shadow-lg transition-shadow bg-transparent"
            >
              <img
                // inicia tentando o arquivo com underscore
                src={`/images/memory${id}_.jpg`}
                alt={`Memória #${id}`}
                className="h-80 w-auto object-cover"
                onError={(e) => handleImgError(e, id)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FoodsPage;
