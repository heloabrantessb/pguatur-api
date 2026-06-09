import { prisma } from '../../shared/prisma'
import { CategoriaInput } from './categorias.schema'
import { Categoria } from '@prisma/client'

export class CategoriaRepository {
  async create(data: CategoriaInput): Promise<Categoria> {
    return prisma.categoria.create({
      data,
    })
  }

  async findAll(): Promise<Categoria[]> {
    return prisma.categoria.findMany()
  }

  async findById(id: number): Promise<Categoria | null> {
    return prisma.categoria.findUnique({
      where: { id },
    })
  }

  async update(id: number, data: Partial<CategoriaInput>): Promise<Categoria> {
    return prisma.categoria.update({
      where: { id },
      data,
    })
  }

  async delete(id: number): Promise<Categoria> {
    return prisma.categoria.delete({
      where: { id },
    })
  }
}