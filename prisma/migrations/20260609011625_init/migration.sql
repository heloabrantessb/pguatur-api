-- CreateEnum
CREATE TYPE "FuncaoUsuario" AS ENUM ('admin', 'usuario');

-- CreateEnum
CREATE TYPE "TipoCategoria" AS ENUM ('local', 'evento');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hash_senha" VARCHAR(255) NOT NULL,
    "funcao" "FuncaoUsuario" NOT NULL,
    "foto_perfil" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rotas" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarios_id" INTEGER NOT NULL,

    CONSTRAINT "rotas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atrativos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT NOT NULL,
    "endereco" VARCHAR(255) NOT NULL,
    "latitude" DECIMAL(10,8) NOT NULL,
    "longitude" DECIMAL(11,8) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    "valor_entrada" DECIMAL(10,2),

    CONSTRAINT "atrativos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locais" (
    "id" SERIAL NOT NULL,
    "atrativos_id" INTEGER NOT NULL,
    "horario_abertura" TIME NOT NULL,
    "horario_fechamento" TIME NOT NULL,

    CONSTRAINT "locais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" SERIAL NOT NULL,
    "atrativos_id" INTEGER NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(45) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" "TipoCategoria" NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atrativos_categorias" (
    "atrativos_id" INTEGER NOT NULL,
    "categorias_id" INTEGER NOT NULL,

    CONSTRAINT "atrativos_categorias_pkey" PRIMARY KEY ("atrativos_id","categorias_id")
);

-- CreateTable
CREATE TABLE "preferencias" (
    "usuarios_id" INTEGER NOT NULL,
    "categorias_id" INTEGER NOT NULL,

    CONSTRAINT "preferencias_pkey" PRIMARY KEY ("usuarios_id","categorias_id")
);

-- CreateTable
CREATE TABLE "rota_atrativos" (
    "id" SERIAL NOT NULL,
    "rotas_id" INTEGER NOT NULL,
    "atrativos_id" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "rota_atrativos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atrativo_imagens" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "imagem_capa" BOOLEAN NOT NULL DEFAULT false,
    "atrativos_id" INTEGER NOT NULL,

    CONSTRAINT "atrativo_imagens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "locais_atrativos_id_key" ON "locais"("atrativos_id");

-- CreateIndex
CREATE UNIQUE INDEX "eventos_atrativos_id_key" ON "eventos"("atrativos_id");

-- AddForeignKey
ALTER TABLE "rotas" ADD CONSTRAINT "rotas_usuarios_id_fkey" FOREIGN KEY ("usuarios_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locais" ADD CONSTRAINT "locais_atrativos_id_fkey" FOREIGN KEY ("atrativos_id") REFERENCES "atrativos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_atrativos_id_fkey" FOREIGN KEY ("atrativos_id") REFERENCES "atrativos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrativos_categorias" ADD CONSTRAINT "atrativos_categorias_atrativos_id_fkey" FOREIGN KEY ("atrativos_id") REFERENCES "atrativos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrativos_categorias" ADD CONSTRAINT "atrativos_categorias_categorias_id_fkey" FOREIGN KEY ("categorias_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencias" ADD CONSTRAINT "preferencias_usuarios_id_fkey" FOREIGN KEY ("usuarios_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencias" ADD CONSTRAINT "preferencias_categorias_id_fkey" FOREIGN KEY ("categorias_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rota_atrativos" ADD CONSTRAINT "rota_atrativos_rotas_id_fkey" FOREIGN KEY ("rotas_id") REFERENCES "rotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rota_atrativos" ADD CONSTRAINT "rota_atrativos_atrativos_id_fkey" FOREIGN KEY ("atrativos_id") REFERENCES "atrativos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrativo_imagens" ADD CONSTRAINT "atrativo_imagens_atrativos_id_fkey" FOREIGN KEY ("atrativos_id") REFERENCES "atrativos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
