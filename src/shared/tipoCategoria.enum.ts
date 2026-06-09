export const TipoCategoria = {
  LOCAL: 'local',
  EVENTO: 'evento',
  AMBOS: 'ambos',
} as const

export type TipoCategoria = (typeof TipoCategoria)[keyof typeof TipoCategoria]
