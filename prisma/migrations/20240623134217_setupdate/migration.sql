-- AlterTable
ALTER TABLE `ModalidadeEsportiva` ADD COLUMN `jogadores_ativos` INTEGER NULL,
    ADD COLUMN `nivel_contato_fisico` ENUM('alto', 'medio', 'baixo') NULL;
