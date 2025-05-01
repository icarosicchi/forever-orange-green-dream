
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
    date: '2023-01-15',
    title: 'First Meeting',
    description: 'The day our paths crossed for the first time.',
    imageUrl: '/images/memory1.jpg'
  },
  {
    id: 2,
    date: '2023-02-14',
    title: 'First Valentine\'s Day',
    description: 'Our first celebration of love together.',
    imageUrl: '/images/memory2.jpg'
  },
  {
    id: 3,
    date: '2023-06-20',
    title: 'Summer Trip',
    description: 'That amazing weekend getaway by the beach.',
    imageUrl: '/images/memory3.jpg'
  },
  {
    id: 4,
    date: '2023-09-30',
    title: 'Moving In Together',
    description: 'The day we started sharing our lives under one roof.'
  },
  {
    id: 5,
    date: '2023-12-25',
    title: 'First Christmas',
    description: 'Sharing the holiday magic together for the first time.'
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
