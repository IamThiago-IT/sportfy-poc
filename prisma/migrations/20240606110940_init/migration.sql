-- CreateTable
CREATE TABLE `ModalidadeEsportiva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `imagem` VARCHAR(191) NULL,
    `numero_jogadores` INTEGER NULL,
    `categoria` VARCHAR(191) NULL,
    `equipamento_necessario` VARCHAR(191) NULL,
    `popularidade` VARCHAR(191) NULL,
    `origem` VARCHAR(191) NULL,
    `status` ENUM('ativo', 'inativo') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Regras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modalidade_esportiva_id` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Regras` ADD CONSTRAINT `Regras_modalidade_esportiva_id_fkey` FOREIGN KEY (`modalidade_esportiva_id`) REFERENCES `ModalidadeEsportiva`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
