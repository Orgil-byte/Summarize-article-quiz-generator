/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_userId_fkey";

-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "User";
