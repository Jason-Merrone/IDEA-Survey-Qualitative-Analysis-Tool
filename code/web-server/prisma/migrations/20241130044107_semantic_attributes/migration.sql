-- AlterTable
ALTER TABLE `PdfTextLine` ADD COLUMN `attribute` ENUM('KNOWLEDGEABLE', 'ENGAGING', 'SUPPORTIVE', 'CLEAR', 'PASSIONATE', 'CONFUSING', 'UNFAIR', 'BORING', 'UNHELPFUL', 'DISORGANIZED') NULL;
