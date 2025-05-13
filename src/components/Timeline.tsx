
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
}

// Sample timeline data - you can replace this with your actual events
const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: '2023-12-03',
    title: 'Primeira Conversa',
    description: 'Obrigado Corey bêbado. Não sei como você me suportou akakakka',
    imageUrl: '/images/print_comeco.jpg'
  },
  {
    id: 2,
    date: '2021-12-10',
    title: 'Nossa primeiro grande bate-papo',
    description: 'Conversamos muuuuuito, juro por tudo que me apaixonei nesse momento',
    imageUrl: '/images/alianca.jpg'
  },
  {
    id: 3,
    date: '2021-12-17',
    title: 'Primeira vez que nos vimos',
    description: 'Eu fui conhecer VOCÊ, mas você é bobinha de mais pra acreditar',
    imageUrl: '/images/memory116.jpg'
  },
  {
    id: 4,
    date: '2021-12-19',
    title: 'Primeiro Encontrooo',
    description: 'Saímos num date pela primeira vezzzzz. Foi simplesmente sensacional, tudo que rolou hehe',
    imageUrl: '/images/memory117.jpg'
  },
  {
    id: 5,
    date: '2022-02-14',
    title: 'Reencontro depois do "webnamoro"',
    description: 'Foi tão bom te ver. E foi a primeira vez...'
  },
  {
    id: 6,
    date: '2022-03-20',
    title: 'Pedido de namorooooo',
    description: 'Melhor coisa que já fiz na minha vida!!!!!!',
    imageUrl: '/images/namoro.jpg'
  },
  {
    id: 7,
    date: '2022-05-13',
    title: 'Seu niverrrr',
    description: 'Conheci grande parte da sua família, mas eles não sabiam quem eu era',
    imageUrl: '/images/memory129.jpg'
  },
  {
    id: 8,
    date: '2023-01-18',
    title: 'Primeira vez em Juquehy',
    description: 'Finalmente conheci sua prainhaaaa'
  },
  {
    id: 9,
    date: '2024-02-14',
    title: 'Nossa primeira viagem pro Riooooo',
    description: 'Eu e tu doidinhos indo ver qualyfing hehe, mas foi incrível!!!',
    imageUrl: '/images/memory50.jpg'
  },
  {
    id: 11,
    date: '2024-12-31',
    title: 'Nosso primeiro ano novo juntos',
    description: 'Ameeeeeiiii, eu, tu e os fogos de Juquehy',
    imageUrl: '/images/memory15.jpg'
  },
  {
    id: 11,
    date: '2025-02-18',
    title: 'Nossa segunda viagem pro Riooooo',
    description: 'Foi ótimo também, pena que o João e sua febre não colaboraram',
    imageUrl: '/images/memory101.jpg'
  }
];

const Timeline: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-love-green to-love-orange" />
      
      {/* Timeline events */}
      <div className="flex flex-col space-y-16">
        {timelineEvents.map((event, index) => (
          <div 
            key={event.id} 
            className={`relative flex ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            } items-center`}
          >
            {/* Content card */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
              <Card className="overflow-hidden border-love-green-light/30 hover:border-love-orange/60 transition-colors duration-300 transform hover:scale-105">
                {event.imageUrl && (
                  <div className="h-48 w-full overflow-hidden">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 text-love-orange mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">{formatDate(event.date)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-foreground/80">{event.description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Center dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-love-orange flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-love-green" />
            </div>

            {/* Empty space for the other side */}
            <div className="w-5/12" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
