/*
  Warnings:

  - You are about to drop the column `attribute` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Messages` MODIFY `text` VARCHAR(1024) NOT NULL;

-- AlterTable
ALTER TABLE `PdfTextLine` MODIFY `lineText` VARCHAR(1024) NOT NULL;

-- AlterTable
ALTER TABLE `Report` DROP COLUMN `attribute`,
    MODIFY `summaryText` VARCHAR(4096) NOT NULL;
