import z from 'zod'
import { TipoCategoria } from '../../shared/tipoCategoria.enum'

export const CategoriaOutput = {
  titulo: z.string(),
  ativo: z.boolean().default(true),
  tipo: z.nativeEnum(TipoCategoria),
  criadoEm: z.date(),
  atualizadoEm: z.date(),
}

export const CategoriaInput = {
  titulo: z.string(),
  ativo: z.boolean().default(true),
  tipo: z.nativeEnum(TipoCategoria),
}

export const CategoriaInputSchema = z.object(CategoriaInput)
export const CategoriaOutputSchema = z.object(CategoriaOutput)

export type CategoriaInput = z.infer<typeof CategoriaInputSchema>
export type CategoriaOutput = z.infer<typeof CategoriaOutputSchema>