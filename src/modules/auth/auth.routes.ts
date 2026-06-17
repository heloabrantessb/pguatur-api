import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { AuthRepository } from "./auth.repository.js";

const authRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const repository = new AuthRepository();
    const service = new AuthService(repository);
    const controller = new AuthController(service);

    // Rotas públicas
    fastify.post("/registro", (request, reply) => controller.registrar(request, reply));
    fastify.post("/login", (request, reply) => controller.login(request, reply));

    // Rota protegida (requer autenticação)
    fastify.get("/perfil", {
        preHandler: [fastify.authenticate],
    }, (request, reply) => controller.perfil(request, reply));
};

export default authRoutes;
