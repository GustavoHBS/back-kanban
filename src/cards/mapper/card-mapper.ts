import { z } from 'zod';
import { Card } from '../card';

const cardTransformer = z.object({
  id: z.string().uuid().optional(),
  titulo: z.string().min(1),
  conteudo: z.string().min(1),
  lista: z.string().min(1),
});

export const payloadToDomain = cardTransformer.parse;
