
import React, { useState, useEffect } from 'react';
import MemoryGrid from '@/components/MemoryGrid';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PlusCircle, Image as ImageIcon, Loader2 } from 'lucide-react';

const TOTAL_MEMORIES = 130;

export default function Memories() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [memoryId, setMemoryId] = useState<number | null>(null);
  const [memories, setMemories] = useState<{id: number}[]>([]);
  const [refreshGrid, setRefreshGrid] = useState(false);

  // Fetch existing memory IDs to find the next available ID
  useEffect(() => {
    const fetchMemoryIds = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('memories')
          .select('memory_id')
          .order('memory_id', { ascending: false });
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setMemories(data);
          // Find next available ID
          const usedIds = data.map(m => m.memory_id);
          for (let i = 1; i <= TOTAL_MEMORIES; i++) {
            if (!usedIds.includes(i)) {
              setMemoryId(i);
              break;
            }
          }
        } else {
          // If no memories exist yet, start with ID 1
          setMemoryId(1);
        }
      } catch (error) {
        console.error('Error fetching memory IDs:', error);
      }
    };
    
    fetchMemoryIds();
  }, [user, refreshGrid]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Upload image to storage and save memory data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !memoryId || !title || !content) {
      toast({
        title: "Informações faltando",
        description: "Por favor preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsUploading(true);
      let imageUrl = `/images/memory${memoryId}.jpg`; // Default to existing image if no new upload
      
      // If there's a new image file, upload it to Supabase Storage
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `memory${memoryId}.${fileExt}`;
        
        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('memories')
          .upload(fileName, imageFile, {
            cacheControl: '3600',
            upsert: true
          });
          
        if (uploadError) throw uploadError;
        
        // Get public URL for the uploaded image
        const { data: urlData } = supabase.storage
          .from('memories')
          .getPublicUrl(uploadData.path);
          
        imageUrl = urlData.publicUrl;
      }
      
      // Save memory data to the database
      const { data, error } = await supabase
        .from('memories')
        .insert({
          memory_id: memoryId,
          user_id: user.id,
          title,
          content,
          image_url: imageUrl
        })
        .select();
        
      if (error) throw error;
      
      // Success!
      setTitle('');
      setContent('');
      setImageFile(null);
      setPreviewUrl(null);
      setOpen(false);
      setRefreshGrid(prev => !prev); // Trigger refetch
      
      toast({
        title: "Memória adicionada",
        description: "Sua nova memória foi salva com sucesso!",
      });
    } catch (error) {
      console.error('Error saving memory:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar sua memória.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-love-gradient pt-24 pb-16">
      <Header totalPages={130} />
      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gradient">
          Todas as Memórias
        </h1>
        <p className="text-center mb-8 text-gray-700">
          Explore todas as nossas memórias juntos.
        </p>
        
        <div className="text-center mb-8">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-love-green hover:bg-love-green-dark">
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Nova Memória
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Nova Memória</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {memoryId && (
                  <div>
                    <label className="text-sm font-medium">Número da Memória</label>
                    <div className="bg-muted p-2 rounded text-center">
                      {memoryId}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Este é o número da memória que será criada (de 1 a {TOTAL_MEMORIES})
                    </p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium">Título</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título da memória"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição</label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Descreva esta memória especial..."
                    required
                    className="min-h-[120px]"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Imagem</label>
                  <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                    {previewUrl ? (
                      <div className="relative w-full h-40">
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          onClick={() => {
                            setImageFile(null);
                            setPreviewUrl(null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center cursor-pointer">
                        <ImageIcon className="h-10 w-10 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">
                          Selecionar imagem
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Se não selecionar uma imagem, será usado o padrão: /images/memory{memoryId}.jpg
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-love-orange hover:bg-love-orange-dark"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Salvar Memória"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <MemoryGrid totalMemories={TOTAL_MEMORIES} refresh={refreshGrid} />
      </main>
    </div>
  );
}
