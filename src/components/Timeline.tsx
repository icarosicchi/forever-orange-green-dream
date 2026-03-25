import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, Pencil, Trash2 } from 'lucide-react';
import CrudDialog, { FieldConfig } from '@/components/CrudDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  isLocal?: boolean;
}

const hardcodedEvents: TimelineEvent[] = [
  { id: "t-1", date: '2023-12-04', title: 'Primeira Conversa', description: 'Obrigado Corey bêbado. Não sei como você me suportou akakakka', imageUrl: '/images/print_comeco.jpg', isLocal: true },
  { id: "t-2", date: '2021-12-11', title: 'Nossa primeiro grande bate-papo', description: 'Conversamos muuuuuito, juro por tudo que me apaixonei nesse momento', imageUrl: '/images/alianca.jpg', isLocal: true },
  { id: "t-3", date: '2021-12-18', title: 'Primeira vez que nos vimos', description: 'Eu fui conhecer VOCÊ, mas você é bobinha de mais pra acreditar', imageUrl: '/images/memory102.jpg', isLocal: true },
  { id: "t-4", date: '2021-12-20', title: 'Primeiro Encontrooo', description: 'Saímos num date pela primeira vezzzzz. Foi simplesmente sensacional, tudo que rolou hehe', imageUrl: '/images/memory103.jpg', isLocal: true },
  { id: "t-5", date: '2022-02-15', title: 'Reencontro depois do "webnamoro"', description: 'Foi tão bom te ver. E foi a primeira vez...', isLocal: true },
  { id: "t-6", date: '2022-03-21', title: 'Pedido de namorooooo', description: 'Melhor coisa que já fiz na minha vida!!!!!!', imageUrl: '/images/namoro.jpg', isLocal: true },
  { id: "t-7", date: '2022-05-14', title: 'Seu niverrrr', description: 'Conheci grande parte da sua família, mas eles não sabiam quem eu era', imageUrl: '/images/memory115.jpg', isLocal: true },
  { id: "t-8", date: '2023-01-19', title: 'Primeira vez em Juquehy', description: 'Finalmente conheci sua prainhaaaa', isLocal: true },
  { id: "t-9", date: '2024-02-15', title: 'Nossa primeira viagem pro Riooooo', description: 'Eu e tu doidinhos indo ver qualyfing hehe, mas foi incrível!!!', imageUrl: '/images/memory49.jpg', isLocal: true },
  { id: "t-10", date: '2025-01-01', title: 'Nosso primeiro ano novo juntos', description: 'Ameeeeeiiii, eu, tu e os fogos de Juquehy', imageUrl: '/images/memory15.jpg', isLocal: true },
  { id: "t-11", date: '2025-02-19', title: 'Nossa segunda viagem pro Riooooo', description: 'Foi ótimo também, pena que o João e sua febre não colaboraram', imageUrl: '/images/memory89.jpg', isLocal: true },
];

const fields: FieldConfig[] = [
  { name: 'title', label: 'Título', type: 'text', required: true },
  { name: 'date', label: 'Data', type: 'date', required: true },
  { name: 'description', label: 'Descrição', type: 'textarea' },
  { name: 'image_url', label: 'Foto', type: 'image' },
];

const Timeline: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dbEvents, setDbEvents] = useState<TimelineEvent[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<TimelineEvent | null>(null);
  const [deleteItem, setDeleteItem] = useState<TimelineEvent | null>(null);

  const fetchEvents = async () => {
    const { data } = await supabase.from('timeline_events').select('*').order('date');
    if (data) setDbEvents(data.map(d => ({ id: d.id, date: d.date, title: d.title, description: d.description, imageUrl: d.image_url || undefined })));
  };

  useEffect(() => { fetchEvents(); }, []);

  const allEvents = [...hardcodedEvents, ...dbEvents].sort((a, b) => a.date.localeCompare(b.date));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  const handleSave = async (data: Record<string, string>) => {
    if (!user) return;
    if (editItem && !editItem.isLocal) {
      await supabase.from('timeline_events').update({ title: data.title, date: data.date, description: data.description, image_url: data.image_url || null }).eq('id', editItem.id);
      toast({ title: 'Atualizado!' });
    } else {
      await supabase.from('timeline_events').insert({ title: data.title, date: data.date, description: data.description || '', image_url: data.image_url || null, user_id: user.id });
      toast({ title: 'Adicionado!' });
    }
    setEditItem(null);
    fetchEvents();
  };

  const handleDelete = async () => {
    if (!deleteItem || deleteItem.isLocal) return;
    await supabase.from('timeline_events').delete().eq('id', deleteItem.id);
    toast({ title: 'Excluído!' });
    setDeleteItem(null);
    fetchEvents();
  };

  return (
    <div className="relative">
      <div className="flex justify-end mb-6">
        <Button onClick={() => { setEditItem(null); setDialogOpen(true); }} className="bg-love-green hover:bg-love-green-dark">
          <Plus className="h-4 w-4 mr-1" /> Novo Evento
        </Button>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-love-green to-love-orange" />

      <div className="flex flex-col space-y-16">
        {allEvents.map((event, index) => (
          <div key={event.id} className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
              <Card className="overflow-hidden border-love-green-light/30 hover:border-love-orange/60 transition-colors duration-300 transform hover:scale-105">
                {event.imageUrl && (
                  <div className="h-48 w-full overflow-hidden">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 text-love-orange mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">{formatDate(event.date)}</span>
                    </div>
                    {!event.isLocal && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditItem(event); setDialogOpen(true); }}><Pencil className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDeleteItem(event)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                      </div>
                    )}
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

      <CrudDialog open={dialogOpen} onClose={() => { setDialogOpen(false); setEditItem(null); }} onSave={handleSave} fields={fields}
        initialData={editItem ? { title: editItem.title, date: editItem.date, description: editItem.description, image_url: editItem.imageUrl || '' } : undefined}
        title={editItem ? 'Editar Evento' : 'Novo Evento'} />
      <DeleteConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDelete} />
    </div>
  );
};

export default Timeline;
