import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import CrudDialog, { FieldConfig } from '@/components/CrudDialog';
import CrudActionBar from '@/components/CrudActionBar';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import ItemPickerDialog from '@/components/ItemPickerDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getCurrentSpaceId } from '@/lib/space';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  sort_order: number;
}

const fields: FieldConfig[] = [
  { name: 'title', label: 'Titulo', type: 'text', required: true },
  { name: 'date', label: 'Data', type: 'date', required: true },
  { name: 'description', label: 'Descricao', type: 'textarea' },
  { name: 'image_url', label: 'Foto', type: 'image' },
];

const Timeline: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState<'edit' | 'delete' | null>(null);
  const [editItem, setEditItem] = useState<TimelineEvent | null>(null);
  const [deleteItem, setDeleteItem] = useState<TimelineEvent | null>(null);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('timeline_events')
      .select('id, date, title, description, image_url, sort_order')
      .order('sort_order', { ascending: true })
      .order('date', { ascending: true });

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao carregar a linha do tempo' });
      return;
    }

    setEvents((data ?? []).map((event) => ({
      id: event.id,
      date: event.date,
      title: event.title,
      description: event.description,
      imageUrl: event.image_url || undefined,
      sort_order: event.sort_order,
    })));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  const handleSelectItem = (id: string | number) => {
    const selectedItem = events.find((event) => event.id === id);
    const currentMode = selectionMode;

    if (!selectedItem || !currentMode) {
      return;
    }

    setSelectionMode(null);

    if (currentMode === 'edit') {
      setEditItem(selectedItem);
      setDialogOpen(true);
      return;
    }

    setDeleteItem(selectedItem);
  };

  const handleSave = async (data: Record<string, string>) => {
    if (!user) {
      return;
    }

    if (editItem) {
      const { error } = await supabase
        .from('timeline_events')
        .update({
          title: data.title,
          date: data.date,
          description: data.description || '',
          image_url: data.image_url || null,
        })
        .eq('id', editItem.id);

      if (error) {
        toast({ variant: 'destructive', title: 'Erro ao atualizar evento' });
        return;
      }

      toast({ title: 'Atualizado!' });
    } else {
      const spaceId = await getCurrentSpaceId(user.id);
      const nextSortOrder = events.length > 0 ? Math.max(...events.map((event) => event.sort_order)) + 1 : 1;

      const { error } = await supabase.from('timeline_events').insert({
        title: data.title,
        date: data.date,
        description: data.description || '',
        image_url: data.image_url || null,
        user_id: user.id,
        space_id: spaceId,
        sort_order: nextSortOrder,
      });

      if (error) {
        toast({ variant: 'destructive', title: 'Erro ao adicionar evento' });
        return;
      }

      toast({ title: 'Adicionado!' });
    }

    setEditItem(null);
    setDialogOpen(false);
    fetchEvents();
  };

  const handleDelete = async () => {
    if (!deleteItem) {
      return;
    }

    const { error } = await supabase.from('timeline_events').delete().eq('id', deleteItem.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao excluir evento' });
      return;
    }

    toast({ title: 'Excluido!' });
    setDeleteItem(null);
    fetchEvents();
  };

  return (
    <div className="relative">
      <div className="flex justify-end mb-6">
        <CrudActionBar
          onCreate={() => { setEditItem(null); setDialogOpen(true); }}
          onEdit={() => setSelectionMode('edit')}
          onDelete={() => setSelectionMode('delete')}
          createClassName="bg-love-green hover:bg-love-green-dark"
          managementDisabled={events.length === 0}
        />
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-love-green to-love-orange" />

      <div className="flex flex-col space-y-16">
        {events.map((event, index) => (
          <div key={event.id} className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
              <Card className="overflow-hidden border-love-green-light/30 hover:border-love-orange/60 transition-colors duration-300 transform hover:scale-105">
                {event.imageUrl && (
                  <div className="h-48 w-full overflow-hidden">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
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
            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-love-orange flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-love-green" />
            </div>
            <div className="w-5/12" />
          </div>
        ))}
      </div>

      <CrudDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditItem(null); }}
        onSave={handleSave}
        fields={fields}
        initialData={editItem ? { title: editItem.title, date: editItem.date, description: editItem.description, image_url: editItem.imageUrl || '' } : undefined}
        title={editItem ? 'Editar Evento' : 'Novo Evento'}
      />
      <ItemPickerDialog
        open={selectionMode !== null}
        onClose={() => setSelectionMode(null)}
        onSelect={handleSelectItem}
        title={selectionMode === 'edit' ? 'Escolha o evento para editar' : 'Escolha o evento para excluir'}
        items={events.map((event) => ({
          id: event.id,
          title: event.title,
          subtitle: formatDate(event.date),
          searchText: `${event.title} ${event.description} ${event.date}`,
        }))}
        searchPlaceholder="Buscar evento..."
      />
      <DeleteConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDelete} />
    </div>
  );
};

export default Timeline;
