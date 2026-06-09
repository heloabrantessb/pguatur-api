import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { app } from "../src/app.js";
import { prisma } from "../src/shared/prisma.js";
import { TipoCategoria } from "../src/shared/tipoCategoria.enum.js";

describe("Categorias Routes", () => {
  beforeEach(async () => {
    await prisma.categoria.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("POST /categorias", () => {
    it("deve criar uma nova categoria com sucesso", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/categorias",
        payload: {
          titulo: "Praias e Ilhas",
          tipo: TipoCategoria.LOCAL,
        },
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("id");
      expect(body.titulo).toBe("Praias e Ilhas");
      expect(body.ativo).toBe(true);
      expect(body.tipo).toBe("local");
    });
  });

  describe("GET /categorias", () => {
    it("deve retornar uma lista vazia quando não houver categorias", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/categorias",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toBeInstanceOf(Array);
      expect(body.length).toBe(0);
    });

    it("deve retornar a lista de categorias cadastradas", async () => {
      await prisma.categoria.create({
        data: {
          titulo: "Restaurantes",
          tipo: TipoCategoria.LOCAL,
        },
      });

      const response = await app.inject({
        method: "GET",
        url: "/categorias",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.length).toBe(1);
      expect(body[0].titulo).toBe("Restaurantes");
    });
  });

  describe("GET /categorias/:id", () => {
    it("deve retornar a categoria correspondente ao id", async () => {
      const criada = await prisma.categoria.create({
        data: {
          titulo: "Hotéis",
          tipo: TipoCategoria.LOCAL,
        },
      });

      const response = await app.inject({
        method: "GET",
        url: `/categorias/${criada.id}`,
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.id).toBe(criada.id);
      expect(body.titulo).toBe("Hotéis");
    });
  });

  describe("PUT /categorias/:id", () => {
    it("deve atualizar os dados da categoria", async () => {
      const criada = await prisma.categoria.create({
        data: {
          titulo: "Museus",
          tipo: TipoCategoria.LOCAL,
        },
      });

      const response = await app.inject({
        method: "PUT",
        url: `/categorias/${criada.id}`,
        payload: {
          titulo: "Museus Históricos",
          ativo: false,
          tipo: TipoCategoria.EVENTO,
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.titulo).toBe("Museus Históricos");
      expect(body.ativo).toBe(false);
      expect(body.tipo).toBe("evento");
    });
  });

  describe("DELETE /categorias/:id", () => {
    it("deve deletar a categoria", async () => {
      const criada = await prisma.categoria.create({
        data: {
          titulo: "Parques",
          ativo: true,
          tipo: TipoCategoria.LOCAL,
        },
      });

      const response = await app.inject({
        method: "DELETE",
        url: `/categorias/${criada.id}`,
      });

      expect(response.statusCode).toBe(200);

      const buscada = await prisma.categoria.findUnique({
        where: { id: criada.id },
      });
      expect(buscada).toBeNull();
    });
  });
});
