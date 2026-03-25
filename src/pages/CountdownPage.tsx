import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import CrudDialog, { FieldConfig } from '@/components/CrudDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CountdownEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  isLocal?: boolean;
}

const hardcodedEvents: CountdownEvent[] = [
  { id: "c-1", title: "Nosso Próximo Mesversário", date: "2025-05-21", description: "Porque não basta comemorar os anos, hehe", isLocal: true },
  { id: "c-2", title: "Próxima Viagem para o Rio", date: "2026-02-15", description: "Ansiosoooo, nossa viagem anual!!", isLocal: true },
  { id: "c-3", title: "Seu próximo niverrr hehe", date: "2026-05-13T22:14:00", description: "Sempre especial!!!", isLocal: true },
  { id: "c-4", title: "Nosso Casamento", date: "?", description: "O dia mais especial das nossas vidas... Detalhes em breve!", isLocal: true },
];

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = new Date(targetDate).getTime() - new Date().getTime() + 3 * 1000 * 60 * 60;
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)) - 1,
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
};

const fields: FieldConfig[] = [
  { name: 'title', label: 'Título', type: 'text', required: true },
  { name: 'date', label: 'Data', type: 'text', placeholder: 'AAAA-MM-DD ou ?' },
  { name: 'description', label: 'Descrição', type: 'textarea' },
];

const CountdownPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dbEvents, setDbEvents] = useState<CountdownEvent[]>([]);
  const [timeLefts, setTimeLefts] = useState<Record<string, TimeLeft>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<CountdownEvent | null>(null);
  const [deleteItem, setDeleteItem] = useState<CountdownEvent | null>(null);

  const fetchEvents = async () => {
    const { data } = await supabase.from('countdown_events').select('*').order('created_at');
    if (data) setDbEvents(data.map(d => ({ id: d.id, title: d.title, date: d.date, description: d.description })));
  };

  useEffect(() => { fetchEvents(); }, []);

  const allEvents = [...hardcodedEvents, ...dbEvents];

  useEffect(() => {
    const update = () => {
      const tl: Record<string, TimeLeft> = {};
      allEvents.forEach(e => { if (e.date !== '?') tl[e.id] = calculateTimeLeft(e.date); });
      setTimeLefts(tl);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [dbEvents]);

  const handleSave = async (data: Record<string, string>) => {
    if (!user) return;
    if (editItem && !editItem.isLocal) {
      await supabase.from('countdown_events').update({ title: data.title, date: data.date || '?', description: data.description }).eq('id', editItem.id);
      toast({ title: 'Atualizado!' });
    } else {
      await supabase.from('countdown_events').insert({ title: data.title, date: data.date || '?', description: data.description || '', user_id: user.id });
      toast({ title: 'Adicionado!' });
    }
    setEditItem(null);
    fetchEvents();
  };

  const handleDelete = async () => {
    if (!deleteItem || deleteItem.isLocal) return;
    await supabase.from('countdown_events').delete().eq('id', deleteItem.id);
    toast({ title: 'Excluído!' });
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
                Esperando ansiosamente por esses momentos com você
              </p>
            </div>
            <Button onClick={() => { setEditItem(null); setDialogOpen(true); }} className="bg-love-orange hover:bg-love-orange-dark">
              <Plus className="h-4 w-4 mr-1" /> Novo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allEvents.map(event => (
              <Card key={event.id} className="border-love-orange/20 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                    {!event.isLocal && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditItem(event); setDialogOpen(true); }}><Pencil className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeleteItem(event)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  <div className="flex justify-around text-center">
                    {['days', 'hours', 'minutes', 'seconds'].map(unit => (
                      <div key={unit} className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-love-green-dark">
                          {event.date === '?' ? '?' : (timeLefts[event.id] as any)?.[unit] || 0}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">{unit === 'days' ? 'Dias' : unit === 'hours' ? 'Horas' : unit === 'minutes' ? 'Min' : 'Seg'}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center text-sm">
                    <span className="text-love-orange">Data: </span>
                    {event.date === '?' ? 'Em breve...' : new Date(event.date).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <CrudDialog open={dialogOpen} onClose={() => { setDialogOpen(false); setEditItem(null); }} onSave={handleSave} fields={fields}
        initialData={editItem ? { title: editItem.title, date: editItem.date, description: editItem.description } : undefined}
        title={editItem ? 'Editar Contagem' : 'Nova Contagem'} />
      <DeleteConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDelete} />
    </div>
  );
};

export default CountdownPage;
