/*
  Warnings:

  - A unique constraint covering the columns `[descricao]` on the table `Regras` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Regras_descricao_key` ON `Regras`(`descricao`);
