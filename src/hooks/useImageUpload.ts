import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File, folder: string = 'uploads'): Promise<string | null> => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('memories')
        .upload(fileName, file);

      if (uploadError) {
        toast({ title: 'Erro ao fazer upload', description: uploadError.message, variant: 'destructive' });
        return null;
      }

      const { data } = supabase.storage.from('memories').getPublicUrl(fileName);
      return data.publicUrl;
    } catch (err) {
      toast({ title: 'Erro no upload', variant: 'destructive' });
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};
