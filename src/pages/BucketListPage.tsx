import React, { useState } from 'react';
import Header from '@/components/Header';
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface BucketItem {
  id: number;
  text: string;
  category: string;
  type: "meu" | "teu" | "nosso"; // Nova propriedade "type"
  completed: boolean;
}

const initialBucketItems: BucketItem[] = [
  // Viagem
  { id: 1, text: "Viajar para a Itália na Primavera", category: "viagem", type: "nosso", completed: false },
  { id: 2, text: "Viajar para a Argentina e comer muita carne", category: "viagem", type: "meu", completed: false },
  { id: 3, text: "Viajar para a Europa ou EUA", category: "viagem", type: "nosso", completed: false },

  
  // Aventuras
  { id: 4, text: "Assistir às luzes da Aurora Boreal juntos", category: "aventura", type: "nosso", completed: false },
  { id: 5, text: "Conhecer o Salar de Uyuni", category: "aventura", type: "nosso", completed: false },
  { id: 6, text: "Assistir às luzes da Aurora Boreal juntos", category: "aventura", type: "nosso", completed: false },
  { id: 7, text: "Ir para a Guatemala ver vulcões", category: "aventura", type: "teu", completed: false },
  { id: 8, text: "Fazer um passeio de balão de ar quente ao amanhecer", category: "aventura", type: "meu", completed: false },
  { id: 9, text: "Fazer observação das estrelas no deserto do Atacama", category: "aventura", type: "nosso", completed: false },
  
  // Experiências
  { id: 10, text: "Fazer uma aula de culinária juntos", category: "experiencia", type: "meu", completed: false },
  { id: 11, text: "Assistir a um show ao vivo do ABBA (Holograma)", category: "experiencia", type: "teu", completed: false },
  { id: 12, text: "Assistir a um show ao vivo do Red Hot Chilli Peppers", category: "experiencia", type: "meu", completed: false },
  { id: 13, text: "Fazer uma sessão de fotos para capturar nosso amor", category: "experiencia", type: "meu", completed: true },
  { id: 14, text: "Ir assistir um Grand Slam, de preferência Wimbledon", category: "experiencia", type: "nosso", completed: false },

  // Metas
  { id: 15, text: "Ficarmos ricos o suficiente para não passar vontade", category: "meta", type: "nosso", completed: false },
  { id: 16, text: "Casarmos e termos uma família", category: "meta", type: "nosso", completed: false },
  { id: 17, text: "Aprender um novo idioma juntos", category: "meta", type: "meu", completed: false },
  { id: 18, text: "Começar uma tradição que continuaremos por anos", category: "meta", type: "meu", completed: false },
  { id: 19, text: "Escrever cartas de amor para abrir em um aniversário especial", category: "meta", type: "meu", completed: false },
];

const categories = [
  { id: "all", label: "Todos" },
  { id: "viagem", label: "Viagem" },
  { id: "aventura", label: "Aventuras" },
  { id: "experiencia", label: "Experiências" },
  { id: "meta", label: "Metas" },
];

const types = [
  { id: "all", label: "Todos" },
  { id: "meu", label: "Sonhos Meus" },
  { id: "teu", label: "Sonhos Teus" },
  { id: "nosso", label: "Sonhos Nossos" },
];

const BucketListPage: React.FC = () => {
  const [bucketItems, setBucketItems] = useState(initialBucketItems);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType] = useState("all");

  const filteredItems = bucketItems.filter(item => {
    const categoryMatch = activeCategory === "all" || item.category === activeCategory;
    const typeMatch = activeType === "all" || item.type === activeType;
    return categoryMatch && typeMatch;
  });

  const completedCount = bucketItems.filter(item => item.completed).length;
  const progressPercentage = Math.round((completedCount / bucketItems.length) * 100);

  const toggleItemCompletion = (id: number) => {
    setBucketItems(bucketItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={130} />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gradient">
            Nossos Sonhos e Metas
          </h1>
          
          <p className="text-xl text-center mb-6 text-foreground/80">
            Aventuras que queremos compartilhar juntos!
          </p>
          
          <div className="love-card mb-12">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm font-medium">Nosso Progresso</span>
              <span className="text-sm font-medium">{completedCount} de {bucketItems.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-love-green/20" />
            <div className="mt-2 text-center text-sm text-muted-foreground">
              {progressPercentage}% completo
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-love-green text-white' 
                    : 'bg-white/80 text-foreground hover:bg-love-green/20'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {types.map(type => (
              <button
                key={type.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeType === type.id
                    ? 'bg-love-orange text-white'
                    : 'bg-white/80 text-foreground hover:bg-love-orange/20'
                }`}
                onClick={() => setActiveType(type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className={`border-love-green/20 transition-colors ${
                  item.completed ? 'bg-love-green/10' : 'bg-white/90'
                }`}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Checkbox
                    id={`item-${item.id}`}
                    checked={item.completed}
                    onCheckedChange={() => toggleItemCompletion(item.id)}
                    className={item.completed ? 'bg-love-green border-love-green' : ''}
                  />
                  <label
                    htmlFor={`item-${item.id}`}
                    className={`flex-1 cursor-pointer ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {item.text}
                  </label>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BucketListPage;
