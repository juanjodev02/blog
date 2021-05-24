/*
  Warnings:

  - You are about to alter the column `slug` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "slug" SET DATA TYPE VARCHAR(255);
