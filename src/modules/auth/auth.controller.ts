import { AuthService } from './auth.service'
import { RegistroInputSchema, LoginInputSchema } from './auth.schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    async registrar(req: FastifyRequest, reply: FastifyReply) {
        try {
            const input = RegistroInputSchema.parse(req.body)
            const usuario = await this.authService.registrar(input)
            return reply.status(201).send(usuario)
        } catch (error) {
            if (error instanceof Error && error.message === 'Email já cadastrado') {
                return reply.status(409).send({ error: error.message })
            }
            return reply.status(500).send(error)
        }
    }

    async login(req: FastifyRequest, reply: FastifyReply) {
        try {
            const input = LoginInputSchema.parse(req.body)
            const usuario = await this.authService.login(input)

            // Gera o token JWT
            const token = req.server.jwt.sign(
                { id: usuario.id, email: usuario.email, funcao: usuario.funcao },
                { expiresIn: '1d' }
            )

            return reply.status(200).send({ usuario, token })
        } catch (error) {
            if (error instanceof Error && error.message === 'Email ou senha inválidos') {
                return reply.status(401).send({ error: error.message })
            }
            return reply.status(500).send(error)
        }
    }

    async perfil(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.user as { id: number }
            const usuario = await this.authService.buscarPorId(id)
            return reply.status(200).send(usuario)
        } catch (error) {
            if (error instanceof Error && error.message === 'Usuário não encontrado') {
                return reply.status(404).send({ error: error.message })
            }
            return reply.status(500).send(error)
        }
    }
}
