import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';

interface LoveItem {
  id: number;
  text: string;
  category?: string;
}

const loveItems: LoveItem[] = [
  // Sua Personalidade
  { id: 1, text: "Sua personalidade", category: "personality" },
  { id: 2, text: "Sua vontade", category: "personality" },
  { id: 3, text: "Sua disciplina", category: "personality" },
  { id: 4, text: "Sua responsabilidade", category: "personality" },
  { id: 5, text: "Sua inteligência", category: "personality" },
  { id: 6, text: "Sua dedicação", category: "personality" },
  { id: 7, text: "Seu gênio forte", category: "personality" },
  { id: 8, text: "Seu jeito de defender seus valores", category: "personality" },
  { id: 9, text: "Seu carinho por sua família", category: "personality" },
  { id: 10, text: "Seu jeito manhoso de ser", category: "personality" },
  { id: 11, text: "Como você ativa o modo nenequinha", category: "personality" },
  { id: 12, text: "Suas manias", category: "personality" },
  { id: 13, text: "Suas músicas", category: "personality" },
  { id: 14, text: "Seus filmes", category: "personality" },
  { id: 15, text: "Sua cultura", category: "personality" },
  { id: 16, text: "Sua curiosidade", category: "personality" },
  { id: 17, text: "Seu posicionamento", category: "personality" },
  { id: 18, text: "O jeito que você pede desculpas", category: "personality" },
  { id: 19, text: "Seu instinto", category: "personality" },
  { id: 20, text: "Como você me entende", category: "personality" },
  { id: 21, text: "Como você me permite ser eu mesmo", category: "personality" },
  { id: 22, text: "Como você me cuida", category: "personality" },
  { id: 23, text: "Como você se preocupa comigo", category: "personality" },
  { id: 24, text: "Como você ama receber carinho", category: "personality" },
  { id: 25, text: "Como você enxerga o futuro", category: "personality" },
  { id: 26, text: "Sua sinceridade", category: "personality" },
  { id: 27, text: "Sua companhia", category: "personality" },
  { id: 28, text: "Sua risada", category: "personality" },
  { id: 29, text: "Seu senso de humor", category: "personality" },
  { id: 30, text: "Suas piadas", category: "personality" },
  { id: 31, text: "Sua ironia", category: "personality" },
  { id: 32, text: "Seu respeito", category: "personality" },
  { id: 33, text: "Como você me torna o melhor de mim", category: "personality" },
  { id: 34, text: "Sua paixão", category: "personality" },
  { id: 35, text: "Sua independência", category: "personality" },
  { id: 36, text: "Sua gratidão", category: "personality" },
  { id: 37, text: "Sua beleza encantadora", category: "personality" },
  { id: 38, text: "Sua presença", category: "personality" },
  { id: 39, text: "Sua simpatia", category: "personality" },
  { id: 40, text: "Seu lado nerdolinha", category: "personality" },
  { id: 41, text: "Sua confiança em mim", category: "personality" },
  { id: 42, text: "Sua admiração e fé em mim", category: "personality" },

  // Sua Beleza
  { id: 43, text: "Seus olhos", category: "beauty" },
  { id: 44, text: "Sua boca", category: "beauty" },
  { id: 45, text: "Seu sorriso", category: "beauty" },
  { id: 46, text: "Seu cabelo ondulado perfeitinho", category: "beauty" },
  { id: 47, text: "Seu nariz", category: "beauty" },
  { id: 48, text: "Seu rosto", category: "beauty" },
  { id: 49, text: "Suas orelhas", category: "beauty" },
  { id: 50, text: "Seu queixinho", category: "beauty" },
  { id: 51, text: "Suas bochechinhas", category: "beauty" },
  { id: 52, text: "Seus lábios", category: "beauty" },
  { id: 53, text: "Seu braço", category: "beauty" },
  { id: 54, text: "Seu selinho", category: "beauty" },
  { id: 55, text: "Seu beijo demorado", category: "beauty" },
  { id: 56, text: "Suas pernocas", category: "beauty" },
  { id: 57, text: "Seus bracinhos", category: "beauty" },
  { id: 58, text: "Seu pé", category: "beauty" },
  { id: 59, text: "Sua coxa", category: "beauty" },
  { id: 60, text: "Sua barriguinha", category: "beauty" },
  { id: 61, text: "Seus peitos", category: "beauty" },
  { id: 62, text: "Sua bunda", category: "beauty" },
  { id: 63, text: "Sua mãozinha", category: "beauty" },
  { id: 64, text: "Seu dedinho com aliança", category: "beauty" },
  { id: 65, text: "Seu corpo escultural", category: "beauty" },
  { id: 66, text: "Seu umbiguinho", category: "beauty" },
  { id: 67, text: "Suas pintas", category: "beauty" },
  { id: 68, text: "Seu óculos", category: "beauty" },
  { id: 69, text: "Seu cheiro", category: "beauty" },
  { id: 70, text: "Sua pele macia", category: "beauty" },
  { id: 71, text: "Seu pescoço", category: "beauty" },
  { id: 72, text: "Como você deita no meu peito", category: "beauty" },

  // Nossos Momentos
  { id: 73, text: "Nossos beijos especiais", category: "moments" },
  { id: 74, text: "Nossas brincadeiras", category: "moments" },
  { id: 75, text: "Nosso autisminho", category: "moments" },
  { id: 76, text: "Seu jeito de ficar surpresa", category: "moments" },
  { id: 77, text: "Seu jeito bobinho de pensar às vezes", category: "moments" },
  { id: 78, text: "Seu jeito de se distrair", category: "moments" },
  { id: 79, text: "Ter você", category: "moments" },
  { id: 80, text: "Pensar em você", category: "moments" },
  { id: 81, text: "Planejar o futuro com você", category: "moments" },
  { id: 82, text: "Ficar à toa com você", category: "moments" },
  { id: 83, text: "Viajar com você", category: "moments" },
  { id: 84, text: "Fazer planos", category: "moments" },
  { id: 85, text: "Jogar algo com você", category: "moments" },
  { id: 86, text: "Assistir algo com você", category: "moments" },
  { id: 87, text: "Conversar com você", category: "moments" },
  { id: 88, text: "Me aconchegar com você", category: "moments" },
  { id: 89, text: "Dirigir com você", category: "moments" },
  { id: 90, text: "Comer com você", category: "moments" },
  { id: 91, text: "Como você me apoia", category: "moments" },
  { id: 92, text: "Como você compartilha minhas loucuras", category: "moments" },
  { id: 93, text: "Como estamos misturando nossas manias", category: "moments" },
  { id: 94, text: "Nossas sapequices", category: "moments" },
  { id: 95, text: "Como você fica animada contando uma fofoca", category: "moments" },
  { id: 96, text: "Nossa presença", category: "moments" },
  { id: 97, text: "Como você é minha sombrinha quando está com vergonha", category: "moments" },

  // Coisinhas Pequenas
  { id: 98, text: "Segurar sua mão", category: "little-things" },
  { id: 99, text: "Como você me entende", category: "little-things" },
  { id: 100, text: "Como você me permite ser eu mesmo", category: "little-things" },
  { id: 101, text: "Como você me cuida", category: "little-things" },
  { id: 102, text: "Como você se preocupa comigo", category: "little-things" },
  { id: 103, text: "Como você ama receber carinho", category: "little-things" },
  { id: 104, text: "Como você enxerga o futuro", category: "little-things" },
  { id: 105, text: "Seu carinho por sua família", category: "little-things" },
  { id: 106, text: "O jeito que você pede desculpas", category: "little-things" },
  { id: 107, text: "Como você fala nada com nada quando vai dormir", category: "little-things" },

  // Nossas Piadas Internas
  { id: 108, text: "Seu jeitinho manhoso de ser", category: "inside-jokes" },
  { id: 109, text: "Como você ativa o modo nenequinha", category: "inside-jokes" },
  { id: 110, text: "Nossas piadas internas", category: "inside-jokes" },
  { id: 111, text: "Seu jeito bobinho de pensar às vezes", category: "inside-jokes" },
  { id: 112, text: "Seu jeito de se distrair", category: "inside-jokes" },
  { id: 113, text: "Como você fica animada contando uma fofoca", category: "inside-jokes" },
  { id: 114, text: "Como estamos misturando nossas manias", category: "inside-jokes" },
  { id: 115, text: "Como você é minha sombrinha quando está com vergonha", category: "inside-jokes" },
  { id: 116, text: "Ser babai e babae", category: "inside-jokes" },
  { id: 117, text: "Ser fofos e queridos por muitos", category: "inside-jokes" },
];

const categories = [
  { id: "all", label: "Todos" },
  { id: "personality", label: "Sua Personalidade" },
  { id: "beauty", label: "Sua Beleza" },
  { id: "moments", label: "Nossos Momentos" },
  { id: "little-things", label: "Coisinhas Pequenas" },
  { id: "inside-jokes", label: "Nossas Piadas Internas" },
];

const LoveListPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState("all");

  const filteredItems = activeCategory === "all"
    ? loveItems
    : loveItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={130} />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gradient">
            O Que Amo em Você
          </h1>
          
          <p className="text-xl text-center mb-10 text-foreground/80">
            Algumas das razões pelas quais meu coração bate por você
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-love-orange text-white' 
                    : 'bg-white/80 text-foreground hover:bg-love-orange/20'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="transform hover:scale-105 transition-transform duration-300">
                <Card className="h-full border-love-orange/20 overflow-hidden">
                  <CardContent className="p-6">
                    <p className="text-foreground/90">{item.text}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoveListPage;
