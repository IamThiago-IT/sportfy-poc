/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `ModalidadeEsportiva` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ModalidadeEsportiva_nome_key` ON `ModalidadeEsportiva`(`nome`);
