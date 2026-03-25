import React, { useState, useEffect } from 'react';
import MemoryGrid from '@/components/MemoryGrid';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import CrudDialog, { FieldConfig } from '@/components/CrudDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DbMemory {
  id: number;
  memory_id: number;
  title: string;
  content: string;
  image_url: string | null;
}

const TOTAL_MEMORIES = 130;

const fields: FieldConfig[] = [
  { name: 'title', label: 'Título', type: 'text', required: true, placeholder: 'Ex: Nosso dia especial' },
  { name: 'content', label: 'Descrição', type: 'textarea', placeholder: 'Conte sobre essa memória...' },
  { name: 'image_url', label: 'Foto', type: 'image' },
];

export default function Memories() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dbMemories, setDbMemories] = useState<DbMemory[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<DbMemory | null>(null);
  const [deleteItem, setDeleteItem] = useState<DbMemory | null>(null);

  const fetchMemories = async () => {
    const { data } = await supabase.from('memories').select('*').order('created_at', { ascending: false });
    if (data) setDbMemories(data);
  };

  useEffect(() => { fetchMemories(); }, []);

  const handleSave = async (data: Record<string, string>) => {
    if (!user) return;
    if (editItem) {
      await supabase.from('memories').update({ title: data.title, content: data.content, image_url: data.image_url || null }).eq('id', editItem.id);
      toast({ title: 'Memória atualizada!' });
    } else {
      const nextId = TOTAL_MEMORIES + dbMemories.length + 1;
      await supabase.from('memories').insert({ title: data.title, content: data.content, image_url: data.image_url || null, memory_id: nextId, user_id: user.id });
      toast({ title: 'Memória adicionada!' });
    }
    setEditItem(null);
    fetchMemories();
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    await supabase.from('memories').delete().eq('id', deleteItem.id);
    toast({ title: 'Memória excluída!' });
    setDeleteItem(null);
    fetchMemories();
  };

  return (
    <div className="min-h-screen bg-love-gradient pt-24 pb-16">
      <Header totalPages={TOTAL_MEMORIES} />
      <main className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gradient">Todas as Memórias</h1>
          <Button onClick={() => { setEditItem(null); setDialogOpen(true); }} className="bg-love-orange hover:bg-love-orange-dark">
            <Plus className="h-4 w-4 mr-1" /> Nova Memória
          </Button>
        </div>
        <p className="text-center mb-8 text-gray-700">Explore todas as nossas memórias juntos.</p>

        {/* DB memories */}
        {dbMemories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gradient">Memórias Adicionadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dbMemories.map(mem => (
                <Card key={mem.id} className="overflow-hidden border-love-orange/20 group relative">
                  {mem.image_url && (
                    <div className="w-full h-48 overflow-hidden">
                      <img src={mem.image_url} alt={mem.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <h3 className="font-bold text-sm mb-1">{mem.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{mem.content}</p>
                    <div className="flex gap-1 mt-2">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditItem(mem); setDialogOpen(true); }}><Pencil className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDeleteItem(mem)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Original local memories grid */}
        <MemoryGrid totalMemories={TOTAL_MEMORIES} />
      </main>

      <CrudDialog open={dialogOpen} onClose={() => { setDialogOpen(false); setEditItem(null); }} onSave={handleSave} fields={fields}
        initialData={editItem ? { title: editItem.title, content: editItem.content, image_url: editItem.image_url || '' } : undefined}
        title={editItem ? 'Editar Memória' : 'Nova Memória'} />
      <DeleteConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDelete} />
    </div>
  );
}
