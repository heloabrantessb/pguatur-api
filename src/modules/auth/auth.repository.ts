import { prisma } from '../../shared/prisma'
import { Usuario } from '@prisma/client'

export class AuthRepository {
  async create(data: { nome: string; email: string; hashSenha: string; funcao: string }): Promise<Usuario> {
    return prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        hashSenha: data.hashSenha,
        funcao: data.funcao as any,
      },
    })
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({
      where: { email },
    })
  }

  async findById(id: number): Promise<Usuario | null> {
    return prisma.usuario.findUnique({
      where: { id },
    })
  }
}
