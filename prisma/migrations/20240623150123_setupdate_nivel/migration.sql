/*
  Warnings:

  - You are about to alter the column `nivel_contato_fisico` on the `ModalidadeEsportiva` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `ModalidadeEsportiva` MODIFY `nivel_contato_fisico` ENUM('Baixo', 'Medio', 'Alto') NULL DEFAULT 'Baixo';
