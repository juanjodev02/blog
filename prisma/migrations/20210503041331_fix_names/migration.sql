/*
  Warnings:

  - You are about to drop the `auth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `authors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories-posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `views` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "auth" DROP CONSTRAINT "auth_ProfileId_fkey";

-- DropForeignKey
ALTER TABLE "authors" DROP CONSTRAINT "authors_ProfileId_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_AuthorId_fkey";

-- DropForeignKey
ALTER TABLE "categories-posts" DROP CONSTRAINT "categories-posts_CategoryId_fkey";

-- DropForeignKey
ALTER TABLE "categories-posts" DROP CONSTRAINT "categories-posts_PostId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_AuthorId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_AuthorId_fkey";

-- DropForeignKey
ALTER TABLE "views" DROP CONSTRAINT "views_PostId_fkey";

-- DropTable
DROP TABLE "auth";

-- DropTable
DROP TABLE "authors";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "categories-posts";

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "profiles";

-- DropTable
DROP TABLE "projects";

-- DropTable
DROP TABLE "views";

-- CreateTable
CREATE TABLE "Auth" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ProfileId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "facebook" VARCHAR(255),
    "twitter" VARCHAR(255),
    "github" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Auth" ADD FOREIGN KEY ("ProfileId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
