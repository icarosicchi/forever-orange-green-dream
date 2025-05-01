
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PlaylistPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={100} />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gradient">
            Our Playlist
          </h1>
          
          <p className="text-xl text-center mb-10 text-foreground/80">
            The soundtrack of our love story
          </p>
          
          <Tabs defaultValue="spotify" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10">
              <TabsTrigger value="spotify">Spotify Playlist</TabsTrigger>
              <TabsTrigger value="songs">Our Special Songs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="spotify">
              <div className="love-card">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DXaqCgtv7ZR3L" 
                    width="100%" 
                    height="380" 
                    frameBorder="0" 
                    allowTransparency={true} 
                    allow="encrypted-media"
                    className="rounded-lg"
                  ></iframe>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    Our collaborative playlist that grows with our relationship.
                    <br />
                    Feel free to add songs that remind you of us!
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="songs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-love-orange/20 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-love-orange/10">
                      <h3 className="font-medium">Perfect</h3>
                      <p className="text-sm text-muted-foreground">Ed Sheeran</p>
                    </div>
                    <div className="p-4">
                      <p className="italic text-foreground/80 text-sm">
                        "When I saw you in that dress, looking so beautiful..."
                      </p>
                      <p className="mt-2 text-sm">
                        Played during our first slow dance together.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-love-orange/20 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-love-orange/10">
                      <h3 className="font-medium">Can't Help Falling In Love</h3>
                      <p className="text-sm text-muted-foreground">Elvis Presley</p>
                    </div>
                    <div className="p-4">
                      <p className="italic text-foreground/80 text-sm">
                        "Take my hand, take my whole life too..."
                      </p>
                      <p className="mt-2 text-sm">
                        The song that was playing when we first said "I love you."
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-love-orange/20 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-love-orange/10">
                      <h3 className="font-medium">All of Me</h3>
                      <p className="text-sm text-muted-foreground">John Legend</p>
                    </div>
                    <div className="p-4">
                      <p className="italic text-foreground/80 text-sm">
                        "All of me loves all of you..."
                      </p>
                      <p className="mt-2 text-sm">
                        Our song for those quiet moments together.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-love-orange/20 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-love-orange/10">
                      <h3 className="font-medium">Thinking Out Loud</h3>
                      <p className="text-sm text-muted-foreground">Ed Sheeran</p>
                    </div>
                    <div className="p-4">
                      <p className="italic text-foreground/80 text-sm">
                        "People fall in love in mysterious ways..."
                      </p>
                      <p className="mt-2 text-sm">
                        Our road trip anthem.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default PlaylistPage;
