import z from 'zod'
import { FuncaoUsuario } from '../../shared/funcaoUsuario.enum'

export const RegistroInput = {
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  funcao: z.nativeEnum(FuncaoUsuario).default(FuncaoUsuario.USUARIO),
}

export const LoginInput = {
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Senha é obrigatória'),
}

export const RegistroInputSchema = z.object(RegistroInput)
export const LoginInputSchema = z.object(LoginInput)

export type RegistroInput = z.infer<typeof RegistroInputSchema>
export type LoginInput = z.infer<typeof LoginInputSchema>
