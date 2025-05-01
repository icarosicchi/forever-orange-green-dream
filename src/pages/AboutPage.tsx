
import React from 'react';
import Header from '@/components/Header';
import { Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={100} />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center text-gradient">
            Our Story
          </h1>
          
          <div className="love-card mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                  alt="Us Together" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-love-green">How We Met</h2>
                <p className="mb-4 text-foreground/90">
                  Our story began on a warm summer evening at a friend's party. Neither of us expected 
                  to meet someone special that night, but fate had other plans. We talked for hours, 
                  laughing and discovering how much we had in common.
                </p>
                <p className="text-foreground/90">
                  Since that night, our lives have been intertwined in the most beautiful way, creating 
                  a tapestry of shared moments, adventures, and deep love.
                </p>
              </div>
            </div>
          </div>
          
          <div className="love-card mb-12">
            <h2 className="text-2xl font-bold mb-6 text-love-orange text-center">Our Favorite Things</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="h-6 w-6 fill-love-green stroke-love-green-dark" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Our Songs</h3>
                  <p className="text-foreground/90">
                    "Perfect" by Ed Sheeran<br />
                    "Can't Help Falling in Love" by Elvis Presley
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="h-6 w-6 fill-love-green stroke-love-green-dark" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Our Places</h3>
                  <p className="text-foreground/90">
                    The beach where we had our first date<br />
                    The hidden café downtown
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="h-6 w-6 fill-love-green stroke-love-green-dark" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Our Movies</h3>
                  <p className="text-foreground/90">
                    "The Notebook"<br />
                    "La La Land"
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="h-6 w-6 fill-love-green stroke-love-green-dark" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Our Foods</h3>
                  <p className="text-foreground/90">
                    Italian pasta at Luigi's<br />
                    Ice cream on hot summer days
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="love-card">
            <h2 className="text-2xl font-bold mb-6 text-love-green text-center">Fun Facts About Us</h2>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="text-lg">💫</div>
                <p className="text-foreground/90">
                  We both ordered the same unusual drink at our first meeting - coconut latte with cinnamon!
                </p>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="text-lg">💫</div>
                <p className="text-foreground/90">
                  We discovered we were both born in the same hospital, but 2 years apart.
                </p>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="text-lg">💫</div>
                <p className="text-foreground/90">
                  Our first trip together was a spontaneous road trip with no destination - we ended up 300 miles away!
                </p>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="text-lg">💫</div>
                <p className="text-foreground/90">
                  We both had the same childhood dream of opening a bookstore café.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
