/*
  Warnings:

  - You are about to alter the column `sender` on the `Messages` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Messages` MODIFY `sender` ENUM('USER', 'AI', 'PROMPT') NOT NULL,
    MODIFY `text` LONGTEXT NOT NULL;
