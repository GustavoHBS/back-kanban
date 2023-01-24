import { z } from 'zod';

export const payloadToDomain = z.object({
  id: z.string().uuid().optional(),
  titulo: z.string().min(1),
  conteudo: z.string().min(1),
  lista: z.string().min(1),
});
