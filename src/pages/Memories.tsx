import React, { useEffect, useState } from 'react';
import MemoryGrid, { MemoryGridItem } from '@/components/MemoryGrid';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CrudDialog, { FieldConfig } from '@/components/CrudDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getCurrentSpaceId } from '@/lib/space';

const fields: FieldConfig[] = [
  { name: 'title', label: 'Titulo', type: 'text', required: true, placeholder: 'Ex: Nosso dia especial' },
  { name: 'content', label: 'Descricao', type: 'textarea', placeholder: 'Conte sobre essa memoria...' },
  { name: 'image_url', label: 'Foto', type: 'image' },
];

export default function Memories() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [memories, setMemories] = useState<MemoryGridItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<MemoryGridItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<MemoryGridItem | null>(null);

  const fetchMemories = async () => {
    const { data, error } = await supabase
      .from('memories')
      .select('id, memory_id, title, content, image_url')
      .order('memory_id', { ascending: true });

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao carregar memorias' });
      return;
    }

    setMemories(data ?? []);
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleSave = async (data: Record<string, string>) => {
    if (!user) {
      return;
    }

    if (editItem) {
      const { error } = await supabase
        .from('memories')
        .update({
          title: data.title,
          content: data.content,
          image_url: data.image_url || null,
        })
        .eq('id', editItem.id);

      if (error) {
        toast({ variant: 'destructive', title: 'Erro ao atualizar memoria' });
        return;
      }

      toast({ title: 'Memoria atualizada!' });
    } else {
      const spaceId = await getCurrentSpaceId(user.id);
      const nextMemoryId = memories.length > 0 ? Math.max(...memories.map((memory) => memory.memory_id)) + 1 : 1;

      const { error } = await supabase.from('memories').insert({
        title: data.title,
        content: data.content,
        image_url: data.image_url || null,
        memory_id: nextMemoryId,
        user_id: user.id,
        space_id: spaceId,
        sort_order: nextMemoryId,
      });

      if (error) {
        toast({ variant: 'destructive', title: 'Erro ao adicionar memoria' });
        return;
      }

      toast({ title: 'Memoria adicionada!' });
    }

    setEditItem(null);
    setDialogOpen(false);
    fetchMemories();
  };

  const handleDelete = async () => {
    if (!deleteItem) {
      return;
    }

    const { error } = await supabase.from('memories').delete().eq('id', deleteItem.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao excluir memoria' });
      return;
    }

    toast({ title: 'Memoria excluida!' });
    setDeleteItem(null);
    fetchMemories();
  };

  return (
    <div className="min-h-screen bg-love-gradient pt-24 pb-16">
      <Header totalPages={memories.length || 130} />
      <main className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-gradient">Todas as Memorias</h1>
            <p className="mt-3 text-left text-gray-700">Explore todas as nossas memorias juntos.</p>
          </div>
          <Button onClick={() => { setEditItem(null); setDialogOpen(true); }} className="bg-love-orange hover:bg-love-orange-dark">
            <Plus className="h-4 w-4 mr-1" /> Nova Memoria
          </Button>
        </div>

        <MemoryGrid
          memories={memories}
          onEdit={(memory) => { setEditItem(memory); setDialogOpen(true); }}
          onDelete={(memory) => setDeleteItem(memory)}
        />
      </main>

      <CrudDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditItem(null); }}
        onSave={handleSave}
        fields={fields}
        initialData={editItem ? { title: editItem.title, content: editItem.content, image_url: editItem.image_url || '' } : undefined}
        title={editItem ? 'Editar Memoria' : 'Nova Memoria'}
      />
      <DeleteConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDelete} />
    </div>
  );
}
