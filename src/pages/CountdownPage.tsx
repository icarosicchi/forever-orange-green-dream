import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import CrudDialog, { FieldConfig } from '@/components/CrudDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getCurrentSpaceId } from '@/lib/space';

interface CountdownEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  sort_order: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = new Date(targetDate).getTime() - new Date().getTime() + 3 * 1000 * 60 * 60;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)) - 1,
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
};

const fields: FieldConfig[] = [
  { name: 'title', label: 'Titulo', type: 'text', required: true },
  { name: 'date', label: 'Data', type: 'text', placeholder: 'AAAA-MM-DD ou ?' },
  { name: 'description', label: 'Descricao', type: 'textarea' },
];

const CountdownPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<CountdownEvent[]>([]);
  const [timeLefts, setTimeLefts] = useState<Record<string, TimeLeft>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<CountdownEvent | null>(null);
  const [deleteItem, setDeleteItem] = useState<CountdownEvent | null>(null);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('countdown_events')
      .select('id, title, date, description, sort_order')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao carregar contagens' });
      return;
    }

    setEvents(data ?? []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const update = () => {
      const nextTimeLefts: Record<string, TimeLeft> = {};
      events.forEach((event) => {
        if (event.date !== '?') {
          nextTimeLefts[event.id] = calculateTimeLeft(event.date);
        }
      });
      setTimeLefts(nextTimeLefts);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [events]);

  const handleSave = async (data: Record<string, string>) => {
    if (!user) {
      return;
    }

    if (editItem) {
      const { error } = await supabase
        .from('countdown_events')
        .update({ title: data.title, date: data.date || '?', description: data.description || '' })
        .eq('id', editItem.id);

      if (error) {
        toast({ variant: 'destructive', title: 'Erro ao atualizar contagem' });
        return;
      }

      toast({ title: 'Atualizado!' });
    } else {
      const spaceId = await getCurrentSpaceId(user.id);
      const nextSortOrder = events.length > 0 ? Math.max(...events.map((event) => event.sort_order)) + 1 : 1;

      const { error } = await supabase.from('countdown_events').insert({
        title: data.title,
        date: data.date || '?',
        description: data.description || '',
        user_id: user.id,
        space_id: spaceId,
        sort_order: nextSortOrder,
      });

      if (error) {
        toast({ variant: 'destructive', title: 'Erro ao adicionar contagem' });
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

    const { error } = await supabase.from('countdown_events').delete().eq('id', deleteItem.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao excluir contagem' });
      return;
    }

    toast({ title: 'Excluido!' });
    setDeleteItem(null);
    fetchEvents();
  };

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={130} />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient">Contagens para Dias Especiais</h1>
              <p className="mt-3 text-left text-xl text-foreground/80">
                Esperando ansiosamente por esses momentos com voce
              </p>
            </div>
            <Button onClick={() => { setEditItem(null); setDialogOpen(true); }} className="bg-love-orange hover:bg-love-orange-dark">
              <Plus className="h-4 w-4 mr-1" /> Novo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="border-love-orange/20 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditItem(event); setDialogOpen(true); }}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeleteItem(event)}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  <div className="flex justify-around text-center">
                    {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                      <div key={unit} className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-love-green-dark">
                          {event.date === '?' ? '?' : timeLefts[event.id]?.[unit as keyof TimeLeft] || 0}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {unit === 'days' ? 'Dias' : unit === 'hours' ? 'Horas' : unit === 'minutes' ? 'Min' : 'Seg'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center text-sm">
                    <span className="text-love-orange">Data: </span>
                    {event.date === '?' ? 'Em breve...' : new Date(event.date).toLocaleDateString('pt-BR')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <CrudDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditItem(null); }}
        onSave={handleSave}
        fields={fields}
        initialData={editItem ? { title: editItem.title, date: editItem.date, description: editItem.description } : undefined}
        title={editItem ? 'Editar Contagem' : 'Nova Contagem'}
      />
      <DeleteConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDelete} />
    </div>
  );
};

export default CountdownPage;
