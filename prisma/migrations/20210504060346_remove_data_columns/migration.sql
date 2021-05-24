/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User.username_unique";

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "updatedAt",
DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "updatedAt",
DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "updatedAt",
DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
DROP COLUMN "updatedAt";
