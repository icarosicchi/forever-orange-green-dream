import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Loader2 } from 'lucide-react';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'image';
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

interface CrudDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Record<string, string>) => Promise<void>;
  fields: FieldConfig[];
  initialData?: Record<string, string>;
  title: string;
}

const CrudDialog: React.FC<CrudDialogProps> = ({ open, onClose, onSave, fields, initialData, title }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const { uploadImage, uploading } = useImageUpload();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      const initial: Record<string, string> = {};
      fields.forEach(f => {
        initial[f.name] = initialData?.[f.name] || '';
      });
      setFormData(initial);
      setImagePreview(initialData?.image_url || null);
    }
  }, [open, initialData]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    const url = await uploadImage(file, 'crud-uploads');
    if (url) {
      setFormData(prev => ({ ...prev, [fieldName]: url }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {fields.map(field => (
            <div key={field.name} className="space-y-1">
              <Label>{field.label}</Label>
              {field.type === 'text' && (
                <Input
                  value={formData[field.name] || ''}
                  onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                  placeholder={field.placeholder}
                />
              )}
              {field.type === 'date' && (
                <Input
                  type="date"
                  value={formData[field.name] || ''}
                  onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                />
              )}
              {field.type === 'textarea' && (
                <Textarea
                  value={formData[field.name] || ''}
                  onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                  placeholder={field.placeholder}
                />
              )}
              {field.type === 'select' && (
                <Select
                  value={formData[field.name] || ''}
                  onValueChange={v => setFormData(prev => ({ ...prev, [field.name]: v }))}
                >
                  <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                    {field.options?.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.type === 'image' && (
                <div>
                  <Input type="file" accept="image/*" onChange={e => handleFileChange(e, field.name)} />
                  {(imagePreview || formData[field.name]) && (
                    <img
                      src={imagePreview || formData[field.name]}
                      alt="Prévia da imagem"
                      className="mt-2 h-32 w-auto rounded object-cover"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={saving || uploading}>
            {(saving || uploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CrudDialog;
