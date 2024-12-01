-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pdfId` INTEGER NOT NULL,
    `summaryText` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Report_pdfId_key`(`pdfId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_pdfId_fkey` FOREIGN KEY (`pdfId`) REFERENCES `Pdfs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
