
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Pizza, Sandwich, Coffee, IceCream } from 'lucide-react';

const TOTAL_PAGES = 100;

const foods = [
  {
    id: 1,
    name: "Pizza de calabresa",
    icon: <Pizza className="h-10 w-10 text-love-orange" />,
    description: "Nossa pizza favorita, que pedimos sempre no nosso restaurante italiano favorito."
  },
  {
    id: 2,
    name: "Hambúrguer artesanal",
    icon: <Sandwich className="h-10 w-10 text-love-orange" />,
    description: "Aquele hambúrguer que experimentamos no nosso primeiro encontro."
  },
  {
    id: 3,
    name: "Café da manhã especial",
    icon: <Coffee className="h-10 w-10 text-love-orange" />,
    description: "O café da manhã que preparamos um para o outro nos finais de semana."
  },
  {
    id: 4,
    name: "Sorvete de pistache",
    icon: <IceCream className="h-10 w-10 text-love-orange" />,
    description: "Nosso sabor de sorvete favorito para os dias quentes de verão."
  },
  {
    id: 5,
    name: "Pizza de calabresa",
    icon: <Pizza className="h-10 w-10 text-love-orange" />,
    description: "Nossa pizza favorita, que pedimos sempre no nosso restaurante italiano favorito."
  },
  {
    id: 6,
    name: "Hambúrguer artesanal",
    icon: <Sandwich className="h-10 w-10 text-love-orange" />,
    description: "Aquele hambúrguer que experimentamos no nosso primeiro encontro."
  },
  {
    id: 7,
    name: "Café da manhã especial",
    icon: <Coffee className="h-10 w-10 text-love-orange" />,
    description: "O café da manhã que preparamos um para o outro nos finais de semana."
  },
  {
    id: 8,
    name: "Sorvete de pistache",
    icon: <IceCream className="h-10 w-10 text-love-orange" />,
    description: "Nosso sabor de sorvete favorito para os dias quentes de verão."
  }
];

const FoodsPage = () => {
  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={TOTAL_PAGES} />

      <main className="pt-24 pb-16 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gradient">
          Nossas Comidas Favoritas
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <Card key={food.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="mb-4 bg-love-green-light p-3 rounded-full">
                  {food.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{food.name}</h3>
                <p className="text-center text-muted-foreground">{food.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FoodsPage;
