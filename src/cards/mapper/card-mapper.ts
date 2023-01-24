import { z } from 'zod';
import { Card } from '../card';

const createCardTransformer = z.object({
  id: z.string().uuid().optional(),
  titulo: z.string().min(1),
  conteudo: z.string().min(1),
  lista: z.string().min(1),
});

export const createPayloadToDomain = createCardTransformer.parse;

const updateCardTransformer = z.object({
  id: z.string().uuid().min(1),
  titulo: z.string().optional(),
  conteudo: z.string().optional(),
  lista: z.string().optional(),
});

export const updatePayloadToDomain = updateCardTransformer.parse;
