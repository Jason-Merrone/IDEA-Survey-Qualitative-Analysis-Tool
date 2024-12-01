-- CreateTable
CREATE TABLE `User` (
    `aNumber` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `preferredName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`aNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aNumber` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `History_aNumber_key`(`aNumber`),
    INDEX `History_aNumber_idx`(`aNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aNumber` VARCHAR(191) NOT NULL,
    `request` VARCHAR(191) NOT NULL,
    `schoolYear` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `summaryText` VARCHAR(191) NOT NULL,
    `historyId` INTEGER NOT NULL,

    INDEX `Requests_aNumber_idx`(`aNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aNumber` VARCHAR(191) NOT NULL,
    `request` VARCHAR(191) NOT NULL,
    `schoolYear` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `historyId` INTEGER NOT NULL,

    INDEX `Chats_aNumber_idx`(`aNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aNumber` VARCHAR(191) NOT NULL,
    `sender` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `chatId` INTEGER NOT NULL,

    INDEX `Messages_aNumber_idx`(`aNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pdfs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aNumber` VARCHAR(191) NOT NULL,
    `pdfName` VARCHAR(191) NOT NULL,
    `schoolYear` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `loadedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Pdfs_aNumber_idx`(`aNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PdfTextLine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aNumber` VARCHAR(191) NOT NULL,
    `lineText` VARCHAR(191) NOT NULL,
    `lineNumber` INTEGER NOT NULL,
    `pdfId` INTEGER NOT NULL,

    INDEX `PdfTextLine_aNumber_idx`(`aNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aNumber` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ActivityLog_aNumber_idx`(`aNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_aNumber_fkey` FOREIGN KEY (`aNumber`) REFERENCES `User`(`aNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requests` ADD CONSTRAINT `Requests_historyId_fkey` FOREIGN KEY (`historyId`) REFERENCES `History`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chats` ADD CONSTRAINT `Chats_historyId_fkey` FOREIGN KEY (`historyId`) REFERENCES `History`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pdfs` ADD CONSTRAINT `Pdfs_aNumber_fkey` FOREIGN KEY (`aNumber`) REFERENCES `User`(`aNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PdfTextLine` ADD CONSTRAINT `PdfTextLine_pdfId_fkey` FOREIGN KEY (`pdfId`) REFERENCES `Pdfs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_aNumber_fkey` FOREIGN KEY (`aNumber`) REFERENCES `User`(`aNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;
