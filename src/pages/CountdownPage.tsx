import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';

interface CountdownEvent {
  id: number;
  title: string;
  date: string;
  description: string;
}

const countdownEvents: CountdownEvent[] = [
  {
    id: 1, 
    title: "Nosso Próximo Mesversário",
    date: "2025-05-21", // Example date - replace with your actual date
    description: "Porque não basta comemorar os anos, hehe"
  },
  {
    id: 2, 
    title: "Próxima Viagem para o Rio",
    date: "2026-02-15", // Example date - replace with your actual date
    description: "Ansiosoooo, nossa viagem anual!!"
  },
  {
    id: 3, 
    title: "Seu próximo niverrr hehe",
    date: "2026-05-13T22:14:00", // Example date - replace with your actual date
    description: "Sempre especial!!!"
  },
  // Novo evento personalizado para o casamento
  {
    id: 4,
    title: "Nosso Casamento",
    date: "?",  // Deixe a data como "?" por enquanto
    description: "O dia mais especial das nossas vidas... Detalhes em breve!" // Mensagem genérica
  }
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const dateInBrazilTimeZone = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const difference = new Date(targetDate).getTime() - new Date().getTime() + 3*1000*60*60;
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24))-1,
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000)
  };
};

const CountdownPage: React.FC = () => {
  const [timeLefts, setTimeLefts] = useState<Record<string, TimeLeft>>({});
  
  useEffect(() => {
    // Calculate initial time lefts
    const initialTimeLefts: Record<string, TimeLeft> = {};
    countdownEvents.forEach(event => {
      initialTimeLefts[event.id] = calculateTimeLeft(event.date);
    });
    setTimeLefts(initialTimeLefts);
    
    // Update time lefts every second
    const timer = setInterval(() => {
      const updatedTimeLefts: Record<string, TimeLeft> = {};
      countdownEvents.forEach(event => {
        updatedTimeLefts[event.id] = calculateTimeLeft(event.date);
      });
      setTimeLefts(updatedTimeLefts);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={130} />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gradient">
            Contagens para Dias Especiais
          </h1>
          
          <p className="text-xl text-center mb-10 text-foreground/80">
            Ansiosamente Esperando esses Momentos com Você
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {countdownEvents.map((event) => (
              <Card key={event.id} className="border-love-orange/20 overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  

                  <div className="flex justify-around text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-love-green-dark">
                        {event.date === "?" ? "?" : timeLefts[event.id]?.days || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">Days</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-love-green-dark">
                        {event.date === "?" ? "?" : timeLefts[event.id]?.hours || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">Hours</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-love-green-dark">
                        {event.date === "?" ? "?" : timeLefts[event.id]?.minutes || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">Minutes</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-love-green-dark">
                        {event.date === "?" ? "?" : timeLefts[event.id]?.seconds || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">Seconds</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center text-sm">
                    <span className="text-love-orange">Data: </span>
                    {event.date === "?" ? "Em breve..." : new Date(event.date).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CountdownPage;
