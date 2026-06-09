import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { app } from "../src/app.js";
import { prisma } from "../src/shared/prisma.js";

describe("Auth Routes", () => {
  beforeEach(async () => {
    await prisma.usuario.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("POST /auth/registro", () => {
    it("deve registrar um novo usuário com sucesso", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/auth/registro",
        payload: {
          nome: "Maria Silva",
          email: "maria@email.com",
          senha: "123456",
        },
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("id");
      expect(body.nome).toBe("Maria Silva");
      expect(body.email).toBe("maria@email.com");
      expect(body.funcao).toBe("usuario");
      expect(body).not.toHaveProperty("hashSenha");
    });

    it("deve retornar 409 ao tentar registrar email duplicado", async () => {
      // Registra o primeiro usuário
      await app.inject({
        method: "POST",
        url: "/auth/registro",
        payload: {
          nome: "Maria Silva",
          email: "maria@email.com",
          senha: "123456",
        },
      });

      // Tenta registrar com o mesmo email
      const response = await app.inject({
        method: "POST",
        url: "/auth/registro",
        payload: {
          nome: "Maria Santos",
          email: "maria@email.com",
          senha: "654321",
        },
      });

      expect(response.statusCode).toBe(409);
      const body = JSON.parse(response.body);
      expect(body.error).toBe("Email já cadastrado");
    });
  });

  describe("POST /auth/login", () => {
    it("deve fazer login com sucesso e retornar token", async () => {
      // Registra o usuário
      await app.inject({
        method: "POST",
        url: "/auth/registro",
        payload: {
          nome: "João Costa",
          email: "joao@email.com",
          senha: "123456",
        },
      });

      // Faz login
      const response = await app.inject({
        method: "POST",
        url: "/auth/login",
        payload: {
          email: "joao@email.com",
          senha: "123456",
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("token");
      expect(body.usuario.email).toBe("joao@email.com");
      expect(body.usuario).not.toHaveProperty("hashSenha");
    });

    it("deve retornar 401 com email incorreto", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/auth/login",
        payload: {
          email: "inexistente@email.com",
          senha: "123456",
        },
      });

      expect(response.statusCode).toBe(401);
      const body = JSON.parse(response.body);
      expect(body.error).toBe("Email ou senha inválidos");
    });

    it("deve retornar 401 com senha incorreta", async () => {
      // Registra o usuário
      await app.inject({
        method: "POST",
        url: "/auth/registro",
        payload: {
          nome: "Ana Lima",
          email: "ana@email.com",
          senha: "123456",
        },
      });

      // Tenta login com senha errada
      const response = await app.inject({
        method: "POST",
        url: "/auth/login",
        payload: {
          email: "ana@email.com",
          senha: "senhaerrada",
        },
      });

      expect(response.statusCode).toBe(401);
      const body = JSON.parse(response.body);
      expect(body.error).toBe("Email ou senha inválidos");
    });
  });

  describe("GET /auth/perfil", () => {
    it("deve retornar o perfil do usuário autenticado", async () => {
      // Registra o usuário
      await app.inject({
        method: "POST",
        url: "/auth/registro",
        payload: {
          nome: "Pedro Souza",
          email: "pedro@email.com",
          senha: "123456",
        },
      });

      // Faz login para obter o token
      const loginResponse = await app.inject({
        method: "POST",
        url: "/auth/login",
        payload: {
          email: "pedro@email.com",
          senha: "123456",
        },
      });

      const { token } = JSON.parse(loginResponse.body);

      // Acessa o perfil com o token
      const response = await app.inject({
        method: "GET",
        url: "/auth/perfil",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.nome).toBe("Pedro Souza");
      expect(body.email).toBe("pedro@email.com");
      expect(body).not.toHaveProperty("hashSenha");
    });

    it("deve retornar 401 sem token de autenticação", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/auth/perfil",
      });

      expect(response.statusCode).toBe(401);
    });

    it("deve retornar 401 com token inválido", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/auth/perfil",
        headers: {
          authorization: "Bearer tokeninvalidoqualquer",
        },
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
