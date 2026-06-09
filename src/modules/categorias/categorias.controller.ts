import { CategoriaInput, CategoriaOutput } from "./categorias.schema";
import { CategoriaService } from "./categorias.service";
import { FastifyReply, FastifyRequest } from "fastify";

export class CategoriaController {
    constructor(
        private readonly categoriaService: CategoriaService
    ) { }

    async criar(req: FastifyRequest, reply: FastifyReply) {
        try {
            const input = req.body as CategoriaInput
            const categoria = await this.categoriaService.criarCategoria(input)
            return reply.status(201).send(categoria)
        } catch (error) {
            return reply.status(500).send(error)
        }
    }

    async buscar(req: FastifyRequest, reply: FastifyReply): Promise<CategoriaOutput> {
        try {
            const categorias = await this.categoriaService.buscarCategorias()
            return reply.status(200).send(categorias)
        } catch (error) {
            return reply.status(500).send(error)
        }
    }

    async buscarPorId(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: string }
            const categoria = await this.categoriaService.buscarCategoriaPorId(Number(id))
            return reply.status(200).send(categoria)
        } catch (error) {
            return reply.status(500).send(error)
        }
    }

    async atualizar(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: string }
            const input = req.body as CategoriaInput
            const categoria = await this.categoriaService.atualizarCategoria(Number(id), input)
            return reply.status(200).send(categoria)
        } catch (error) {
            return reply.status(500).send(error)
        }
    }

    async deletar(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: string }
            const categoria = await this.categoriaService.deletarCategoria(Number(id))
            return reply.status(200).send(categoria)
        } catch (error) {
            return reply.status(500).send(error)
        }
    }
}