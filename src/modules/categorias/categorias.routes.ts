import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { CategoriaController } from "./categorias.controller.js";
import { CategoriaService } from "./categorias.service.js";
import { CategoriaRepository } from "./categorias.repository.js";

const categoriasRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const repository = new CategoriaRepository();
    const service = new CategoriaService(repository);
    const controller = new CategoriaController(service);

    fastify.post("/", (request, reply) => controller.criar(request, reply));
    fastify.get("/", (request, reply) => controller.buscar(request, reply));
    fastify.get("/:id", (request, reply) => controller.buscarPorId(request, reply));
    fastify.put("/:id", (request, reply) => controller.atualizar(request, reply));
    fastify.delete("/:id", (request, reply) => controller.deletar(request, reply));
};

export default categoriasRoutes;